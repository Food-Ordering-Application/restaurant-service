import { RestaurantService } from './../restaurant/restaurant.service';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateMenuDto,
  FetchMenuGroupsAndItemsDto,
  FetchMenuOfRestaurantDto,
  MenuDto,
  MenuForOrderDto,
  MenuWithMenuGroupsAndItemsDto,
  UpdatedMenuDataDto,
  UpdateMenuDto,
} from './dto';
import { Menu, MenuGroup, MenuItem, ToppingGroup } from './entities';
import {
  ICreateMenuResponse,
  IFetchMenuGroupsAndItemsResponse,
  IFetchMenuOfRestaurantResponse,
  IMenuInformationResponse,
  IMenuItemToppingResponse,
  IUpdateMenuResponse,
} from './interfaces';

@Injectable()
export class MenuService {
  private readonly logger = new Logger('MenuService');

  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectRepository(MenuGroup)
    private menuGroupRepository: Repository<MenuGroup>,
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
    @InjectRepository(ToppingGroup)
    private toppingGroupRepository: Repository<ToppingGroup>,
    private restaurantService: RestaurantService,
  ) {}

  async getMenuInformation(
    restaurantId: string,
  ): Promise<IMenuInformationResponse> {
    const menu = await this.menuRepository
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.menuGroups', 'menuGroup')
      .leftJoinAndSelect('menuGroup.menuItems', 'menuItem')
      .where('menu.restaurantId = :restaurantId', { restaurantId })
      .andWhere('menu.isActive = :activeMenu', {
        activeMenu: true,
      })
      .andWhere('menuGroup.isActive = :activeMenuGroup', {
        activeMenuGroup: true,
      })
      .andWhere('menuItem.isActive = :activeMenuItem', {
        activeMenuItem: true,
      })
      .orderBy({
        'menuGroup.index': 'ASC',
        'menuItem.index': 'ASC',
      })
      .getOne();

    if (!menu) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Restaurant not found or it have not had menu yet',
        data: null,
      };
    }
    return {
      status: HttpStatus.OK,
      message: 'Fetched menu information successfully',
      data: {
        menu: MenuForOrderDto.EntityToDto(menu),
      },
    };
  }

  async getMenuItemToppingInfo(
    menuItemId: string,
  ): Promise<IMenuItemToppingResponse> {
    try {
      const toppingGroups = await this.toppingGroupRepository
        .createQueryBuilder('topG')
        .leftJoinAndSelect('topG.toppingItems', 'topI')
        .leftJoinAndSelect('topI.menuItemToppings', 'menuITop')
        .where('menuITop.menuItemId = :menuItemId', {
          menuItemId: menuItemId,
        })
        .andWhere('topI.isActive = :activeToppingItem', {
          activeToppingItem: true,
        })
        .andWhere('topG.isActive = :activeToppingGroup', {
          activeToppingGroup: true,
        })
        .orderBy({
          'topG.index': 'ASC',
          'topI.index': 'ASC',
        })
        .select([
          'topG.id',
          'topG.name',
          'topI.id',
          'topI.name',
          'topI.description',
          'topI.price',
          'topI.maxQuantity',
          'menuITop.customPrice',
        ])
        .getMany();

      const customToppingGroups = toppingGroups.map((toppingGroup) => {
        const { toppingItems } = toppingGroup;
        const customToppingItems = toppingItems.map((toppingItem) => {
          const { price } = toppingItem;
          const { menuItemToppings, ...newToppingItem } = toppingItem;
          const { customPrice } = menuItemToppings[0];
          return {
            ...newToppingItem,
            price: customPrice === null ? price : customPrice,
          };
        });
        return {
          ...toppingGroup,
          toppingItems: customToppingItems,
        };
      });

      return {
        status: HttpStatus.OK,
        message: 'MenuItemToppings fetched successfully',
        toppingGroups: customToppingGroups,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        toppingGroups: null,
      };
    }
  }

  async didRestaurantHaveMenu(restaurantId: string) {
    const count = await this.menuRepository.count({ restaurantId });
    return count > 0;
  }

  async create(dto: CreateMenuDto): Promise<ICreateMenuResponse> {
    const { data, merchantId, restaurantId } = dto;
    const { isActive, name, index } = data;

    // menu co restaurant => check menu
    const doesRestaurantExistPromise = this.restaurantService.doesRestaurantExist(
      restaurantId,
    );
    const didRestaurantHaveMenuPromise = this.didRestaurantHaveMenu(
      restaurantId,
    );

    const [doesRestaurantExist, didRestaurantHaveMenu] = await Promise.all([
      doesRestaurantExistPromise,
      didRestaurantHaveMenuPromise,
    ]);

    if (doesRestaurantExist) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Restaurant not found',
        data: null,
      };
    }

    if (didRestaurantHaveMenu) {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Restaurant already has menu',
        data: null,
      };
    }

    const menu = this.menuRepository.create({
      restaurantId,
      name,
      isActive,
      index,
    });
    const newMenu = await this.menuRepository.save(menu);

    return {
      status: HttpStatus.CREATED,
      message: 'Menu was created',
      data: {
        menu: MenuDto.EntityToDto(newMenu),
      },
    };
  }

  async fetchMenuOfRestaurant(
    fetchMenuOfRestaurantDto: FetchMenuOfRestaurantDto,
  ): Promise<IFetchMenuOfRestaurantResponse> {
    const { restaurantId, size, page } = fetchMenuOfRestaurantDto;

    const [results, total] = await this.menuRepository.findAndCount({
      where: [{ restaurantId }],
      take: size,
      skip: page * size,
    });

    return {
      status: HttpStatus.OK,
      message: 'Fetched menu successfully',
      data: {
        results: results.map((menu) => MenuDto.EntityToDto(menu)),
        size,
        total,
      },
    };
  }

  async update(updateMenuDto: UpdateMenuDto): Promise<IUpdateMenuResponse> {
    const { data, menuId, restaurantId, merchantId } = updateMenuDto;

    const fetchCountMenu = await this.menuRepository.count({
      id: menuId,
      restaurantId: restaurantId,
    });
    if (fetchCountMenu === 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Menu not found',
      };
    }

    // remove unwanted field
    const templateObject: UpdatedMenuDataDto = {
      name: null,
      index: null,
      isActive: null,
    };
    Object.keys(data).forEach((key) =>
      typeof templateObject[key] == 'undefined' ? delete data[key] : {},
    );

    // save to database
    await this.menuRepository.update({ id: menuId }, { ...data });

    return {
      status: HttpStatus.OK,
      message: 'Menu updated successfully',
    };
  }

  async doesMenuExist(menuId: string, restaurantId: string): Promise<boolean> {
    const count = await this.menuRepository.count({ id: menuId, restaurantId });
    return count > 0;
  }

  async fetchMenuGroupsAndItems(
    fetchMenuGroupsAndItemsDto: FetchMenuGroupsAndItemsDto,
  ): Promise<IFetchMenuGroupsAndItemsResponse> {
    const { menuId, merchantId, restaurantId } = fetchMenuGroupsAndItemsDto;

    const doesMenuExist = await this.doesMenuExist(menuId, restaurantId);
    if (!doesMenuExist) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Menu not found',
        data: null,
      };
    }

    const menu = await this.menuRepository
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.menuGroups', 'menuGroup')
      .leftJoinAndSelect('menuGroup.menuItems', 'menuItem')
      .where('menu.id = :id', { id: menuId })
      .orderBy({
        'menuGroup.index': 'ASC',
        'menuItem.index': 'ASC',
      })
      .select([
        'menu.id',
        'menuGroup.id',
        'menuGroup.name',
        'menuItem.id',
        'menuItem.name',
      ])
      .getOne();

    return {
      status: HttpStatus.OK,
      message: 'Fetched menu groups and items of menu successfully',
      data: {
        menu: MenuWithMenuGroupsAndItemsDto.EntityToDto(menu),
      },
    };
  }
}

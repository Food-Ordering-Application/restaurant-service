import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateMenuDto,
  FetchMenuOfRestaurantDto,
  GetToppingInfoOfAMenuDto,
  MenuDto,
  UpdatedMenuDataDto,
  UpdateMenuDto,
} from './dto';
import {
  Menu,
  MenuGroup,
  MenuItem,
  MenuItemTopping,
  ToppingGroup,
} from './entities';
import {
  ICreateMenuResponse,
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
  ) {}

  async getMenuInformation(
    restaurantId: string,
  ): Promise<IMenuInformationResponse> {
    try {
      const menu = await this.menuRepository.findOne({ restaurantId });
      const menuGroups = await this.menuGroupRepository
        .createQueryBuilder('menuG')
        .leftJoin('menuG.menu', 'menu')
        .leftJoinAndSelect('menuG.menuItems', 'menuI')
        .where('menu.id = :menuId', { menuId: menu.id })
        .getMany();

      return {
        status: HttpStatus.OK,
        message: 'Restaurant fetched successfully',
        menu: menu,
        menuGroups: menuGroups,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        menu: null,
        menuGroups: null,
      };
    }
  }

  async getMenuItemToppingInfo(
    menuItemId: string,
  ): Promise<IMenuItemToppingResponse> {
    try {
      const toppingGroups = await this.toppingGroupRepository
        .createQueryBuilder('topG')
        .leftJoinAndSelect('topG.toppingItems', 'topI')
        .leftJoinAndSelect('topI.menuItemToppings', 'menuITop')
        .leftJoin('menuITop.menuItem', 'menuI')
        .where('menuI.id = :menuItemId', { menuItemId: menuItemId })
        .getMany();

      return {
        status: HttpStatus.OK,
        message: 'MenuItemToppings fetched successfully',
        toppingGroups,
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

  async getToppingInfoOfAMenu(
    getToppingInfoOfAMenuDto: GetToppingInfoOfAMenuDto,
  ): Promise<IMenuItemToppingResponse> {
    const { menuId, restaurantId } = getToppingInfoOfAMenuDto;
    try {
      const toppingGroups = await this.toppingGroupRepository
        .createQueryBuilder('topG')
        .leftJoinAndSelect('topG.toppingItems', 'topI')
        .leftJoinAndSelect('topI.menuItemToppings', 'menuITop')
        .where('topG.menuId = :menuId', { menuId: menuId })
        .getMany();

      return {
        status: HttpStatus.OK,
        message: 'Toppings fetched successfully',
        toppingGroups,
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

    const didRestaurantHaveMenu = await this.didRestaurantHaveMenu(
      restaurantId,
    );
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
}

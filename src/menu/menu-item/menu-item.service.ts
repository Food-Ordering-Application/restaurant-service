import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository, SelectQueryBuilder } from 'typeorm';
import { MenuItem } from '../entities/menu-item.entity';
import {
  CreateMenuItemDto,
  DeleteMenuItemDto,
  GetMenuItemDetailDto,
  GetMenuItemInfosDto,
  GetMenuItemToppingsOfCurrentMenuItemDto,
  MenuItemToppingOfMenuItemDto,
  UpdatedMenuItemDataDto,
  UpdateMenuItemDto,
  UpdateMenuItemToppingsOfCurrentMenuItemDto,
} from './dto';
import { FetchMenuItemOfMenuDto } from './dto/fetch-menu-item-of-menu.dto';
import { MenuItemDto } from './dto/menu-item.dto';
import {
  ICreateMenuItemResponse,
  IDeleteMenuItemResponse,
  IGetMenuItemDetailResponse,
  IGetMenuItemInfosResponse,
  IGetMenuItemToppingsOfCurrentMenuItemResponse,
  IUpdateMenuItemResponse,
  IUpdateMenuItemToppingsOfCurrentMenuItemResponse,
} from './interfaces';
import { IFetchMenuItemOfMenuResponse } from './interfaces/fetch-menu-item-of-menu-response.interface';
import { MenuGroupService } from '../menu-group/menu-group.service';
import { MenuItemForOrder } from '../dto/menu-for-order/menu-item-for-order.dto';
import { MenuItemTopping, ToppingItem } from '../entities';
@Injectable()
export class MenuItemService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
    @InjectRepository(ToppingItem)
    private toppingItemRepository: Repository<ToppingItem>,
    @InjectRepository(MenuItemTopping)
    private menuItemToppingRepository: Repository<MenuItemTopping>,
    private menuGroupService: MenuGroupService,
  ) {}

  async findAll(
    fetchMenuItemDto: FetchMenuItemOfMenuDto,
  ): Promise<IFetchMenuItemOfMenuResponse> {
    const {
      merchantId,
      restaurantId,
      menuId,
      size,
      page,
      search = '',
    } = fetchMenuItemDto;
    const [results, total] = await this.menuItemRepository.findAndCount({
      where: [{ menuId, name: Like(`%${search}%`) }],
      take: size,
      skip: page * size,
      order: { index: 'ASC' },
    });

    return {
      status: HttpStatus.OK,
      message: 'Fetched menu item successfully',
      data: {
        results: results.map((menuItem) => MenuItemDto.EntityToDto(menuItem)),
        size,
        total,
      },
    };
  }

  async create(
    createMenuItemDto: CreateMenuItemDto,
  ): Promise<ICreateMenuItemResponse> {
    const { data, merchantId, restaurantId, menuId } = createMenuItemDto;
    const { menuGroupId } = data;

    const doesMenuGroupExist = await this.menuGroupService.doesMenuGroupExist({
      menuId,
      menuGroupId,
    });
    if (!doesMenuGroupExist) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Cannot find menu group in menu',
        data: null,
      };
    }

    const { name, description, price, imageUrl, index, isActive } = data;
    const menuItem = this.menuItemRepository.create({
      menuGroupId,
      menuId,
      name,
      description,
      price,
      imageUrl,
      index,
      isActive,
    });
    const newMenuItem = await this.menuItemRepository.save(menuItem);

    return {
      status: HttpStatus.CREATED,
      message: 'Menu item created successfully',
      data: {
        menuItem: MenuItemDto.EntityToDto(newMenuItem),
      },
    };
  }

  async update(
    updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<IUpdateMenuItemResponse> {
    const {
      data,
      menuId,
      // restaurantId,
      // merchantId,
      menuItemId,
    } = updateMenuItemDto;

    const fetchCountMenuItem = await this.menuItemRepository.count({
      id: menuItemId,
      // menuId: menuId,
    });
    if (fetchCountMenuItem === 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Menu item not found',
      };
    }

    const { menuGroupId = null } = data;
    if (menuGroupId) {
      const doesMenuGroupExist = await this.menuGroupService.doesMenuGroupExist(
        { menuId, menuGroupId },
      );
      if (!doesMenuGroupExist) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Cannot find menu group in menu',
        };
      }
    }

    // remove unwanted field
    const templateObject: UpdatedMenuItemDataDto = {
      menuGroupId: null,
      name: null,
      description: null,
      price: null,
      imageUrl: null,
      index: null,
      isActive: null,
      state: null,
    };
    Object.keys(data).forEach((key) =>
      typeof templateObject[key] == undefined ? delete data[key] : {},
    );

    // save to database
    try {
      await this.menuItemRepository.update({ id: menuItemId }, data);
      return {
        status: HttpStatus.OK,
        message: 'Menu item updated successfully',
      };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      };
    }
  }

  async delete(
    deleteMenuItemDto: DeleteMenuItemDto,
  ): Promise<IDeleteMenuItemResponse> {
    const { menuId, restaurantId, merchantId, menuItemId } = deleteMenuItemDto;
    const fetchCountMenuItem = await this.menuItemRepository.count({
      id: menuItemId,
      menuId: menuId,
    });
    if (fetchCountMenuItem === 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Menu item not found',
      };
    }

    // shallow delete to database
    await this.menuItemRepository.softDelete({ id: menuItemId });

    return {
      status: HttpStatus.OK,
      message: 'MenuItem deleted successfully',
    };
  }

  async getMenuItemInfos(
    getMenuItemInfosDto: GetMenuItemInfosDto,
  ): Promise<IGetMenuItemInfosResponse> {
    const { menuItemIds } = getMenuItemInfosDto;
    const menuItems = await this.getMenuItemsByIds(menuItemIds);
    return {
      status: HttpStatus.OK,
      message: 'Populate menu item infos menu item successfully',
      data: {
        menuItems,
      },
    };
  }

  async getMenuItemsByIds(ids: string[]): Promise<MenuItemForOrder[]> {
    if (!ids.length) return [];
    let queryBuilder: SelectQueryBuilder<MenuItem> = this.menuItemRepository.createQueryBuilder(
      'item',
    );
    queryBuilder = queryBuilder.where('item.id IN (:...ids)', { ids: ids });
    const menuItems = await queryBuilder.getMany();
    const result = ids.map((id) =>
      MenuItemForOrder.EntityToDto(menuItems.find((r) => r.id == id)),
    );
    return result;
  }

  async getMenuItemDetail(
    getMenuItemDetailDto: GetMenuItemDetailDto,
  ): Promise<IGetMenuItemDetailResponse> {
    const {
      menuId,
      merchantId,
      restaurantId,
      menuItemId,
    } = getMenuItemDetailDto;

    const menuItem = await this.menuItemRepository.findOne({
      id: menuItemId,
      menuId: menuId,
    });

    if (!menuItem) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Menu item not found',
        data: null,
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Get menu item detail successfully',
      data: {
        menuItem: MenuItemDto.EntityToDto(menuItem),
      },
    };
  }

  async fetchMenuItemTopping(
    fetchMenuItemToppingDto: GetMenuItemToppingsOfCurrentMenuItemDto,
  ): Promise<IGetMenuItemToppingsOfCurrentMenuItemResponse> {
    const { menuItemId } = fetchMenuItemToppingDto;
    const menuItemTopping = await this.menuItemToppingRepository.find({
      menuItemId,
    });
    // TODO
    return {
      status: HttpStatus.OK,
      message: 'Fetched menu item toppings of menu item successfully',
      data: {
        menuItemId,
        results: menuItemTopping.map((menuItemTopping) =>
          MenuItemToppingOfMenuItemDto.EntityToDto(menuItemTopping),
        ),
      },
    };
  }

  async updateMenuItemTopping(
    updateMenuItemToppingDto: UpdateMenuItemToppingsOfCurrentMenuItemDto,
  ): Promise<IUpdateMenuItemToppingsOfCurrentMenuItemResponse> {
    const {
      data,
      menuId,
      restaurantId,
      merchantId,
      menuItemId,
    } = updateMenuItemToppingDto;

    const fetchCountMenuItem = await this.menuItemRepository.count({
      id: menuItemId,
      menuId: menuId,
    });
    if (fetchCountMenuItem === 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Menu item not found',
      };
    }

    const { menuItemToppings = [] } = data;

    const toppingItemIds = menuItemToppings.map(
      ({ toppingItemId }) => toppingItemId,
    );
    const numberOfValidToppingItemIds = await this.toppingItemRepository.count({
      id: In(toppingItemIds),
    });

    if (numberOfValidToppingItemIds !== toppingItemIds.length) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'One of topping item ids is not valid. Please check again',
      };
    }

    // save to database
    await this.menuItemToppingRepository.delete({ menuItemId });

    const menuItemToppingsEntity = menuItemToppings.map(
      ({ toppingItemId, customPrice }) =>
        this.menuItemToppingRepository.create({
          menuId,
          toppingItemId,
          menuItemId,
          customPrice,
        }),
    );

    await this.menuItemToppingRepository.save(menuItemToppingsEntity);
    return {
      status: HttpStatus.OK,
      message: 'Menu item updated successfully',
    };
  }
}

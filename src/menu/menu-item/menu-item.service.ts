import { MenuService } from '../menu.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { MenuItem } from '../entities/menu-item.entity';
import { CreateMenuItemDto, DeleteMenuItemDto, UpdatedMenuItemDataDto, UpdateMenuItemDto } from './dto';
import { FetchMenuItemOfMenuDto } from './dto/fetch-menu-item-of-menu.dto';
import { MenuItemDto } from './dto/menu-item.dto';
import { ICreateMenuItemResponse, IDeleteMenuItemResponse, IUpdateMenuItemResponse } from './interfaces';
import { IFetchMenuItemOfMenuResponse } from './interfaces/fetch-menu-item-of-menu-response.interface';
import { MenuGroupService } from '../menu-group/menu-group.service';
@Injectable()
export class MenuItemService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
    private menuGroupService: MenuGroupService
  ) {
  }

  async findAll(fetchMenuItemDto: FetchMenuItemOfMenuDto): Promise<IFetchMenuItemOfMenuResponse> {
    const { merchantId, restaurantId, menuId, size, page, search = '' } = fetchMenuItemDto;
    const [results, total] = await this.menuItemRepository.findAndCount({
      where: [{ menuId, name: Like(`%${search}%`) }],
      take: size,
      skip: page * size
    });

    return {
      status: HttpStatus.OK,
      message: 'Fetched menu item successfully',
      data: {
        results: results.map((menuItem) => MenuItemDto.EntityToDto(menuItem)),
        size,
        total
      }
    };
  }

  async create(createMenuItemDto: CreateMenuItemDto): Promise<ICreateMenuItemResponse> {
    const { data, merchantId, restaurantId, menuId } = createMenuItemDto;
    const { menuGroupId } = data;

    const doesMenuGroupExist = await this.menuGroupService.doesMenuGroupExist({ menuId, menuGroupId });
    if (!doesMenuGroupExist) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Cannot find menu group in menu',
        data: null
      }
    }

    const { name, description, price, imageUrl, index, isActive } = data;
    const menuItem = this.menuItemRepository.create({
      menuGroupId, menuId, name, description, price, imageUrl, index, isActive
    });
    const newMenuItem = await this.menuItemRepository.save(menuItem);

    return {
      status: HttpStatus.CREATED,
      message: 'Menu item created successfully',
      data: {
        menuItem: MenuItemDto.EntityToDto(newMenuItem)
      }
    };
  }


  async update(updateMenuItemDto: UpdateMenuItemDto): Promise<IUpdateMenuItemResponse> {
    const { data, menuId, restaurantId, merchantId, menuItemId } = updateMenuItemDto;

    const fetchCountMenuItem = await this.menuItemRepository.count({ id: menuItemId, menuId: menuId });
    if (fetchCountMenuItem === 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Menu item not found',
      }
    }

    const { menuGroupId = null } = data;
    if (menuGroupId) {
      const doesMenuGroupExist = await this.menuGroupService.doesMenuGroupExist({ menuId, menuGroupId });
      if (!doesMenuGroupExist) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Cannot find menu group in menu',
        }
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
      isActive: null
    }
    Object.keys(data).forEach(key => typeof templateObject[key] == 'undefined' ? delete data[key] : {});

    // save to database
    await this.menuItemRepository.update({ id: menuItemId }, data);

    return {
      status: HttpStatus.OK,
      message: 'Menu item updated successfully',
    };
  }


  async delete(deleteMenuItemDto: DeleteMenuItemDto): Promise<IDeleteMenuItemResponse> {
    const { menuId, restaurantId, merchantId, menuItemId } = deleteMenuItemDto;
    const fetchCountMenuItem = await this.menuItemRepository.count({ id: menuItemId, menuId: menuId });
    if (fetchCountMenuItem === 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Menu item not found',
      }
    }

    // shallow delete to database
    await this.menuItemRepository.softDelete({ id: menuItemId });

    return {
      status: HttpStatus.OK,
      message: 'MenuItem deleted successfully',
    };
  }

}
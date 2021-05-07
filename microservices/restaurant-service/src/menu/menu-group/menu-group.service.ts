import { MenuService } from '../menu.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { MenuGroup } from '../entities/menu-group.entity';
import { CreateMenuGroupDto } from './dto';
import { FetchMenuGroupOfMenuDto } from './dto/fetch-menu-group-of-menu.dto';
import { MenuGroupDto } from './dto/menu-group.dto';
import { ICreateMenuGroupResponse } from './interfaces';
import { IFetchMenuGroupOfMenuResponse } from './interfaces/fetch-menu-group-of-menu-response.interface';
@Injectable()
export class MenuGroupService {
  constructor(
    @InjectRepository(MenuGroup)
    private menuGroupRepository: Repository<MenuGroup>,
    private menuService: MenuService
  ) {
  }

  async create(createMenuGroupDto: CreateMenuGroupDto): Promise<ICreateMenuGroupResponse> {
    const { data, merchantId, restaurantId, menuId } = createMenuGroupDto;

    const doesMenuExist = await this.menuService.doesMenuExist(menuId, restaurantId);
    if (!doesMenuExist) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Menu not found',
        data: null
      }
    }

    const { index, isActive, name } = data;
    const menuGroup = this.menuGroupRepository.create({
      index, isActive, menuId, name
    });
    const newMenuGroup = await this.menuGroupRepository.save(menuGroup);

    return {
      status: HttpStatus.CREATED,
      message: 'Menu group created successfully',
      data: {
        menuGroup: MenuGroupDto.EntityToDto(newMenuGroup)
      }
    };
  }

  async findAll(fetchMenuGroupDto: FetchMenuGroupOfMenuDto): Promise<IFetchMenuGroupOfMenuResponse> {
    const { merchantId, restaurantId, menuId, size, page, search = '' } = fetchMenuGroupDto;
    const [results, total] = await this.menuGroupRepository.findAndCount({
      where: [{ menuId, name: Like(`%${search}%`) }],
      take: size,
      skip: page * size
    });

    return {
      status: HttpStatus.OK,
      message: 'Fetched menu group successfully',
      data: {
        results: results.map((menuGroup) => MenuGroupDto.EntityToDto(menuGroup)),
        size,
        total
      }
    };
  }


  // async update(updateMenuGroupDto: UpdateMenuGroupDto): Promise<IMenuGroupServiceResponse> {
  //   const { data, menuGroupId, restaurantId } = updateMenuGroupDto;
  //   // TODO handle valid uuid
  //   const doesRestaurantExistPromise = this.merchantService.doesRestaurantExist(restaurantId);
  //   const fetchMenuGroupPromise = this.menuGroupRepository.findOne({ id: menuGroupId });

  //   const [doesRestaurantExist, menuGroup] = await Promise.all([doesRestaurantExistPromise, fetchMenuGroupPromise]);

  //   if (!menuGroup) {
  //     return {
  //       status: HttpStatus.NOT_FOUND,
  //       message: 'MenuGroup not found',
  //     }
  //   }

  //   if (!doesRestaurantExist) {
  //     return {
  //       status: HttpStatus.NOT_FOUND,
  //       message: 'Restaurant not found',
  //     }
  //   }

  //   // remove unwanted field
  //   const templateObject: UpdatedMenuGroupDataDto = {
  //     firstName: null,
  //     lastName: null,
  //     phone: null,
  //     IDNumber: null,
  //     dateOfBirth: null
  //   }
  //   Object.keys(data).forEach(key => typeof templateObject[key] == 'undefined' ? delete data[key] : {});

  //   // save to database
  //   await this.menuGroupRepository.save({ ...menuGroup, ...data });

  //   return {
  //     status: HttpStatus.OK,
  //     message: 'MenuGroup updated successfully',
  //   };
  // }


  // async delete(deleteMenuGroupDto: DeleteMenuGroupDto): Promise<IMenuGroupServiceResponse> {
  //   const { menuGroupId, restaurantId } = deleteMenuGroupDto;
  //   // TODO handle valid uuid
  //   const doesRestaurantExistPromise = this.merchantService.doesRestaurantExist(restaurantId);
  //   const fetchMenuGroupPromise = this.menuGroupRepository.findOne({ id: menuGroupId });

  //   const [doesRestaurantExist, menuGroup] = await Promise.all([doesRestaurantExistPromise, fetchMenuGroupPromise]);

  //   if (!menuGroup) {
  //     return {
  //       status: HttpStatus.NOT_FOUND,
  //       message: 'MenuGroup not found',
  //     }
  //   }

  //   if (!doesRestaurantExist) {
  //     return {
  //       status: HttpStatus.NOT_FOUND,
  //       message: 'Restaurant not found',
  //     }
  //   }

  //   // shallow delete to database
  //   await this.menuGroupRepository.softDelete({ id: menuGroupId });

  //   return {
  //     status: HttpStatus.OK,
  //     message: 'MenuGroup deleted successfully',
  //   };
  // }

}
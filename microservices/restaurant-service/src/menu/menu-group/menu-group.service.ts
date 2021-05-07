import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { MenuGroup } from '../entities/menu-group.entity';
import { FetchMenuGroupOfMenuDto } from './dto/fetch-menu-group-of-menu.dto';
import { MenuGroupDto } from './dto/menu-group.dto';
import { IFetchMenuGroupOfMenuResponse } from './interfaces/fetch-menu-group-of-menu-response.interface';
@Injectable()
export class MenuGroupService {
  constructor(
    @InjectRepository(MenuGroup)
    private menuGroupRepository: Repository<MenuGroup>,
  ) {
  }

  // async create(createMenuGroupDto: CreateMenuGroupDto): Promise<IMenuGroupServiceCreateMenuGroupResponse> {
  //   const { data, merchantId, restaurantId } = createMenuGroupDto;
  //   const { username, password, firstName, lastName, IDNumber, dateOfBirth, phone } = data;

  //   const doesRestaurantExistPromise = this.merchantService.doesRestaurantExist(restaurantId);
  //   const menuGroupWithThisUsernamePromise = this.menuGroupRepository.findOne({
  //     username,
  //     merchantId,
  //     restaurantId
  //   });

  //   const [doesRestaurantExist, menuGroupWithThisUsername] = await Promise.all([doesRestaurantExistPromise, menuGroupWithThisUsernamePromise]);

  //   if (!doesRestaurantExist) {
  //     return {
  //       status: HttpStatus.NOT_FOUND,
  //       message: 'Restaurant not found',
  //       data: null
  //     }
  //   }
  //   if (menuGroupWithThisUsername) {
  //     return {
  //       status: HttpStatus.CONFLICT,
  //       message: 'MenuGroup\'s username already exists',
  //       data: null
  //     }
  //   }

  //   const newUser = this.menuGroupRepository.create({
  //     username, password, firstName, lastName, IDNumber, dateOfBirth, phone, merchantId, restaurantId
  //   });
  //   await this.menuGroupRepository.save(newUser);

  //   return {
  //     status: HttpStatus.CREATED,
  //     message: 'MenuGroup created successfully',
  //     data: {
  //       menuGroup: MenuGroupDto.EntityToDto(newUser)
  //     }
  //   };
  // }

  async findAll(fetchMenuGroupDto: FetchMenuGroupOfMenuDto): Promise<IFetchMenuGroupOfMenuResponse> {
    const { merchantId, restaurantId, menuId, size, page, search } = fetchMenuGroupDto;
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
import { MenuService } from '../menu.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ToppingGroup } from '../entities/topping-group.entity';
import {
  CreateToppingGroupDto,
  DeleteToppingGroupDto,
  UpdatedToppingGroupDataDto,
  UpdateToppingGroupDto,
} from './dto';
import { FetchToppingGroupOfMenuDto } from './dto/fetch-topping-group-of-menu.dto';
import { ToppingGroupDto } from './dto/topping-group.dto';
import {
  ICreateToppingGroupResponse,
  IDeleteToppingGroupResponse,
  IUpdateToppingGroupResponse,
} from './interfaces';
import { IFetchToppingGroupOfMenuResponse } from './interfaces/fetch-topping-group-of-menu-response.interface';
@Injectable()
export class ToppingGroupService {
  constructor(
    @InjectRepository(ToppingGroup)
    private toppingGroupRepository: Repository<ToppingGroup>,
    private menuService: MenuService,
  ) {}

  async create(
    createToppingGroupDto: CreateToppingGroupDto,
  ): Promise<ICreateToppingGroupResponse> {
    const { data, merchantId, restaurantId, menuId } = createToppingGroupDto;

    const doesMenuExist = await this.menuService.doesMenuExist(
      menuId,
      restaurantId,
    );
    if (!doesMenuExist) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Menu not found',
        data: null,
      };
    }

    const { index, isActive, name } = data;
    const toppingGroup = this.toppingGroupRepository.create({
      index,
      isActive,
      menuId,
      name,
    });
    const newToppingGroup = await this.toppingGroupRepository.save(
      toppingGroup,
    );

    return {
      status: HttpStatus.CREATED,
      message: 'Topping group created successfully',
      data: {
        toppingGroup: ToppingGroupDto.EntityToDto(newToppingGroup),
      },
    };
  }

  async findAll(
    fetchToppingGroupDto: FetchToppingGroupOfMenuDto,
  ): Promise<IFetchToppingGroupOfMenuResponse> {
    const {
      merchantId,
      restaurantId,
      menuId,
      size,
      page,
      search = '',
    } = fetchToppingGroupDto;
    const [results, total] = await this.toppingGroupRepository.findAndCount({
      where: [{ menuId, name: Like(`%${search}%`) }],
      take: size,
      skip: page * size,
    });

    return {
      status: HttpStatus.OK,
      message: 'Fetched topping group successfully',
      data: {
        results: results.map((toppingGroup) =>
          ToppingGroupDto.EntityToDto(toppingGroup),
        ),
        size,
        total,
      },
    };
  }

  async update(
    updateToppingGroupDto: UpdateToppingGroupDto,
  ): Promise<IUpdateToppingGroupResponse> {
    const {
      data,
      menuId,
      restaurantId,
      merchantId,
      toppingGroupId,
    } = updateToppingGroupDto;

    const doesToppingGroupExist = await this.doesToppingGroupExist({
      menuId,
      toppingGroupId,
    });
    if (!doesToppingGroupExist) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Topping group not found',
      };
    }

    // remove unwanted field
    const templateObject: UpdatedToppingGroupDataDto = {
      name: null,
      index: null,
      isActive: null,
    };
    Object.keys(data).forEach((key) =>
      typeof templateObject[key] == 'undefined' ? delete data[key] : {},
    );

    // save to database
    await this.toppingGroupRepository.update({ id: toppingGroupId }, data);

    return {
      status: HttpStatus.OK,
      message: 'Topping group updated successfully',
    };
  }

  async delete(
    deleteToppingGroupDto: DeleteToppingGroupDto,
  ): Promise<IDeleteToppingGroupResponse> {
    const {
      menuId,
      restaurantId,
      merchantId,
      toppingGroupId,
    } = deleteToppingGroupDto;
    const doesToppingGroupExist = await this.doesToppingGroupExist({
      menuId,
      toppingGroupId,
    });
    if (!doesToppingGroupExist) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Topping group not found',
      };
    }

    // shallow delete to database
    await this.toppingGroupRepository.softDelete({ id: toppingGroupId });

    return {
      status: HttpStatus.OK,
      message: 'ToppingGroup deleted successfully',
    };
  }

  async doesToppingGroupExist(data: {
    menuId: string;
    toppingGroupId: string;
  }): Promise<boolean> {
    const { menuId, toppingGroupId } = data;
    const count = await this.toppingGroupRepository.count({
      id: toppingGroupId,
      menuId: menuId,
    });
    return count > 0;
  }
}

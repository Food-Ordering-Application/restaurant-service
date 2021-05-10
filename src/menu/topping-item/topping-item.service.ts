import { MenuService } from '../menu.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ToppingItem } from '../entities/topping-item.entity';
import { CreateToppingItemDto, DeleteToppingItemDto, UpdatedToppingItemDataDto, UpdateToppingItemDto } from './dto';
import { FetchToppingItemOfMenuDto } from './dto/fetch-topping-item-of-menu.dto';
import { ToppingItemDto } from './dto/topping-item.dto';
import { ICreateToppingItemResponse, IDeleteToppingItemResponse, IUpdateToppingItemResponse } from './interfaces';
import { IFetchToppingItemOfMenuResponse } from './interfaces/fetch-topping-item-of-menu-response.interface';
import { MenuGroupService } from '../menu-group/menu-group.service';
import { ToppingGroupService } from '../topping-group/topping-group.service';
@Injectable()
export class ToppingItemService {
  constructor(
    @InjectRepository(ToppingItem)
    private toppingItemRepository: Repository<ToppingItem>,
    private toppingGroupService: ToppingGroupService
  ) {
  }

  async findAll(fetchToppingItemDto: FetchToppingItemOfMenuDto): Promise<IFetchToppingItemOfMenuResponse> {
    const { merchantId, restaurantId, menuId, size, page, search = '' } = fetchToppingItemDto;
    const [results, total] = await this.toppingItemRepository.findAndCount({
      where: [{ menuId, name: Like(`%${search}%`) }],
      take: size,
      skip: page * size
    });

    return {
      status: HttpStatus.OK,
      message: 'Fetched topping item successfully',
      data: {
        results: results.map((toppingItem) => ToppingItemDto.EntityToDto(toppingItem)),
        size,
        total
      }
    };
  }

  async create(createToppingItemDto: CreateToppingItemDto): Promise<ICreateToppingItemResponse> {
    const { data, merchantId, restaurantId, menuId } = createToppingItemDto;
    const { toppingGroupId } = data;

    const doesToppingGroupExist = await this.toppingGroupService.doesToppingGroupExist({ menuId, toppingGroupId });
    if (!doesToppingGroupExist) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Cannot find topping group in menu',
        data: null
      }
    }

    const { name, description, price, maxQuantity, index, isActive } = data;
    const toppingItem = this.toppingItemRepository.create({
      toppingGroupId, menuId, name, description, price, maxQuantity, index, isActive
    });
    const newToppingItem = await this.toppingItemRepository.save(toppingItem);

    return {
      status: HttpStatus.CREATED,
      message: 'Topping item created successfully',
      data: {
        toppingItem: ToppingItemDto.EntityToDto(newToppingItem)
      }
    };
  }


  async update(updateToppingItemDto: UpdateToppingItemDto): Promise<IUpdateToppingItemResponse> {
    const { data, menuId, restaurantId, merchantId, toppingItemId } = updateToppingItemDto;

    const fetchCountToppingItem = await this.toppingItemRepository.count({ id: toppingItemId, menuId: menuId });
    if (fetchCountToppingItem === 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Topping item not found',
      }
    }

    const { toppingGroupId = null } = data;
    if (toppingGroupId) {
      const doesToppingGroupExist = await this.toppingGroupService.doesToppingGroupExist({ menuId, toppingGroupId });
      if (!doesToppingGroupExist) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Cannot find topping group in menu',
        }
      }
    }

    // remove unwanted field
    const templateObject: UpdatedToppingItemDataDto = {
      toppingGroupId: null,
      name: null,
      description: null,
      price: null,
      maxQuantity: null,
      index: null,
      isActive: null
    }
    Object.keys(data).forEach(key => typeof templateObject[key] == 'undefined' ? delete data[key] : {});

    // save to database
    await this.toppingItemRepository.update({ id: toppingItemId }, data);

    return {
      status: HttpStatus.OK,
      message: 'Topping item updated successfully',
    };
  }


  async delete(deleteToppingItemDto: DeleteToppingItemDto): Promise<IDeleteToppingItemResponse> {
    const { menuId, restaurantId, merchantId, toppingItemId } = deleteToppingItemDto;
    const fetchCountToppingItem = await this.toppingItemRepository.count({ id: toppingItemId, menuId: menuId });
    if (fetchCountToppingItem === 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Topping item not found',
      }
    }

    // shallow delete to database
    await this.toppingItemRepository.softDelete({ id: toppingItemId });

    return {
      status: HttpStatus.OK,
      message: 'Topping item deleted successfully',
    };
  }

}
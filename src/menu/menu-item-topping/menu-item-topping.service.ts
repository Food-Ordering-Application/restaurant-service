import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItemTopping } from '../entities';
import {
  MenuItemToppingOfMenuDto,
  FetchMenuItemToppingsOfMenuDto,
} from './dto';
import { IFetchMenuItemToppingsOfMenuResponse } from './interfaces';
@Injectable()
export class MenuItemToppingService {
  constructor(
    @InjectRepository(MenuItemTopping)
    private menuItemToppingRepository: Repository<MenuItemTopping>,
  ) {}

  async findAll(
    fetchMenuItemToppingDto: FetchMenuItemToppingsOfMenuDto,
  ): Promise<IFetchMenuItemToppingsOfMenuResponse> {
    const {
      merchantId,
      restaurantId,
      menuId,
      size,
      page,
    } = fetchMenuItemToppingDto;
    const [results, total] = await this.menuItemToppingRepository.findAndCount({
      where: [{ menuId }],
      take: size,
      skip: page * size,
    });

    return {
      status: HttpStatus.OK,
      message: 'Fetched menu item toppings successfully',
      data: {
        results: results.map((toppingItem) =>
          MenuItemToppingOfMenuDto.EntityToDto(toppingItem),
        ),
        size,
        total,
      },
    };
  }
}

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as constants from '../../../../../constants';
import { ISimpleResponse } from '../../../../../shared/interfaces/simple-response.interface';
import {
  CreateMenuItemDto,
  CreateMenuItemResponseDto,
  DeleteMenuItemResponseDto,
  FetchMenuItemByMenuResponseDto,
  FetchMenuItemQuery,
  UpdateMenuItemDto,
  UpdateMenuItemResponseDto
} from './dto';
import { IRestaurantServiceCreateMenuItemResponse, IRestaurantServiceFetchMenuItemByMenuResponse } from './interfaces';

@Injectable()
export class MenuItemService {
  constructor(
    @Inject(constants.RESTAURANT_SERVICE) private menuItemServiceClient: ClientProxy,
  ) { }

  async createMenuItem(merchantId: string, restaurantId: string, menuId: string, createMenuItemDto: CreateMenuItemDto): Promise<CreateMenuItemResponseDto> {
    const createMenuItemResponse: IRestaurantServiceCreateMenuItemResponse = await this.menuItemServiceClient
      .send('createMenuItem', { merchantId, restaurantId, menuId, data: createMenuItemDto })
      .toPromise();

    const { status, message, data } = createMenuItemResponse;
    if (status !== HttpStatus.CREATED) {
      throw new HttpException({ message, }, status,);
    }
    const { menuItem } = data;
    return {
      statusCode: 201,
      message,
      data: {
        menuItem
      }
    };
  }

  async updateMenuItem(menuItemId: string, merchantId: string, restaurantId: string, menuId: string, updateMenuItemDto: UpdateMenuItemDto): Promise<UpdateMenuItemResponseDto> {
    const updateMenuItemResponse: ISimpleResponse = await this.menuItemServiceClient
      .send('updateMenuItem', { menuItemId, merchantId, restaurantId, menuId, data: updateMenuItemDto })
      .toPromise();

    const { status, message } = updateMenuItemResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message, }, status,);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
    };
  }

  async deleteMenuItem(menuItemId: string, merchantId: string, restaurantId: string, menuId: string): Promise<DeleteMenuItemResponseDto> {
    const deleteMenuItemResponse: ISimpleResponse = await this.menuItemServiceClient
      .send('deleteMenuItem', { menuItemId, merchantId, restaurantId, menuId })
      .toPromise();

    const { status, message } = deleteMenuItemResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message, }, status,);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
    };
  }

  async fetchMenuItem(merchantId: string, restaurantId: string, menuId: string, fetchMenuItemByMenuQuery: FetchMenuItemQuery): Promise<FetchMenuItemByMenuResponseDto> {
    const fetchMenuItemResponse: IRestaurantServiceFetchMenuItemByMenuResponse = await this.menuItemServiceClient
      .send('fetchMenuItemOfMenu', {
        merchantId,
        restaurantId,
        menuId,
        page: parseInt(fetchMenuItemByMenuQuery.page) || 0,
        size: parseInt(fetchMenuItemByMenuQuery.size) || 10,
        search: fetchMenuItemByMenuQuery.q
      })
      .toPromise();

    const { status, message, data } = fetchMenuItemResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message, }, status,);
    }
    const { results, size, total } = data;
    return {
      statusCode: 200,
      message,
      data: {
        results,
        size,
        total
      }
    };
  }
}

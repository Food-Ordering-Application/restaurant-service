import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as constants from '../../../../constants';
import { CreateMenuDto } from './dto/create-menu/create-menu.dto';
import { FetchMenuOfRestaurantResponseDto } from './dto/fetch-menu/fetch-menu-response.dto';
import { FetchMenuDto } from './dto/fetch-menu/fetch-menu.dto';
import { IRestaurantServiceFetchMenuOfRestaurantResponse } from './interfaces';
import { IRestaurantServiceCreateMenuResponse } from './interfaces/restaurant-service-create-menu-response.interface';

@Injectable()
export class MenuService {
  constructor(
    @Inject(constants.RESTAURANT_SERVICE) private menuServiceClient: ClientProxy,
  ) { }

  async createMenu(merchantId: string, createMenuDto: CreateMenuDto) {
    const createMenuResponse: IRestaurantServiceCreateMenuResponse = await this.menuServiceClient
      .send('createMenu', { merchantId, createMenuDto })
      .toPromise();
    const { status, message, data } = createMenuResponse;
    if (status !== HttpStatus.CREATED) {
      throw new HttpException({ message, }, status,);
    }
    return {
      statusCode: 201,
      message,
      data
    };
  }

  async fetchMenuOfRestaurant(merchantId: string, fetchMenuOfRestaurantDto: FetchMenuDto): Promise<FetchMenuOfRestaurantResponseDto> {
    const { restaurantId } = fetchMenuOfRestaurantDto;
    const fetchMenuOfRestaurantResponse: IRestaurantServiceFetchMenuOfRestaurantResponse
      = await this.menuServiceClient
        .send('fetchMenuOfRestaurant', {
          restaurantId,
          page: parseInt(fetchMenuOfRestaurantDto.page) || 0,
          size: parseInt(fetchMenuOfRestaurantDto.size) || 10
        })
        .toPromise();

    const { status, message, data } = fetchMenuOfRestaurantResponse;
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

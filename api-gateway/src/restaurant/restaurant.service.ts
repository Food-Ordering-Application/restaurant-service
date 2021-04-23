import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  GetMenuInformationResponseDto,
  GetMenuItemToppingInfoResponseDto,
  GetRestaurantInformationResponseDto,
  GetSomeRestaurantDto,
  GetSomeRestaurantResponseDto,
} from './dto/index';
import * as constants from '../constants';
import { ClientProxy } from '@nestjs/microservices';
import {
  IRestaurantResponse,
  IRestaurantsResponse,
  IMenuInformationResponse,
} from './interfaces';
import { IMenuItemToppingResponse } from './interfaces/get-menu-topping-info-response.interface';

@Injectable()
export class RestaurantService {
  constructor(
    @Inject(constants.RESTAURANT_SERVICE)
    private restaurantServiceClient: ClientProxy,
  ) {}

  async getSomeRestaurant(
    getSomeRestaurantDto: GetSomeRestaurantDto,
  ): Promise<GetSomeRestaurantResponseDto> {
    const getSomeRestaurantResponse: IRestaurantsResponse = await this.restaurantServiceClient
      .send('getSomeRestaurant', getSomeRestaurantDto)
      .toPromise();

    if (getSomeRestaurantResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: getSomeRestaurantResponse.message,
        },
        getSomeRestaurantResponse.status,
      );
    }
    return {
      statusCode: 200,
      message: getSomeRestaurantResponse.message,
      data: {
        restaurants: getSomeRestaurantResponse.restaurants,
      },
    };
  }

  async getRestaurantInformation(
    restaurantId,
  ): Promise<GetRestaurantInformationResponseDto> {
    const getRestaurantInformationResponse: IRestaurantResponse = await this.restaurantServiceClient
      .send('getRestaurantInformation', { restaurantId })
      .toPromise();

    if (getRestaurantInformationResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: getRestaurantInformationResponse.message,
        },
        getRestaurantInformationResponse.status,
      );
    }
    return {
      statusCode: 200,
      message: getRestaurantInformationResponse.message,
      data: {
        restaurant: getRestaurantInformationResponse.restaurant,
      },
    };
  }

  async getMenuInformation(
    restaurantId,
  ): Promise<GetMenuInformationResponseDto> {
    const getMenuInformationResponse: IMenuInformationResponse = await this.restaurantServiceClient
      .send('getMenuInformation', { restaurantId })
      .toPromise();

    const { menu, menuGroups, message, status } = getMenuInformationResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: 200,
      message,
      data: {
        menu,
        menuGroups,
      },
    };
  }

  async getMenuItemToppingInfo(
    menuItemId,
  ): Promise<GetMenuItemToppingInfoResponseDto> {
    const getMenuInformationResponse: IMenuItemToppingResponse = await this.restaurantServiceClient
      .send('getMenuItemToppingInfo', { menuItemId })
      .toPromise();

    const { toppingGroups, message, status } = getMenuInformationResponse;

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message,
        },
        status,
      );
    }
    return {
      statusCode: 200,
      message,
      data: {
        toppingGroups,
      },
    };
  }
}

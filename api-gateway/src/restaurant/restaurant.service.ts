import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  GetRestaurantInformationResponseDto,
  GetSomeRestaurantDto,
  GetSomeRestaurantResponseDto,
} from './dto/index';
import { IRestaurantsResponse } from './interfaces/get-multiple-restaurant-response.interface';
import * as constants from '../constants';
import { ClientProxy } from '@nestjs/microservices';
import { IRestaurantResponse } from './interfaces/get-restaurant-information-response.interface';

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
}

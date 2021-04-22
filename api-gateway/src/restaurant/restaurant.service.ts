import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { GetSomeRestaurantResponseDto } from './dto/index';
import { IRestaurantsResponse } from './interfaces/get-multiple-restaurant-response.interface';
import * as constants from '../constants';
import { ClientProxy } from '@nestjs/microservices';
import { GetSomeRestaurantDto } from './dto/get-some-restaurant.dto';

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

  getRestaurantInformation() {
    return 'This action adds a new restaurant';
  }
}

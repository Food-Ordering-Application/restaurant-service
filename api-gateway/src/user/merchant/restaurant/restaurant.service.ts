import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as constants from '../../../constants';
import { CreateRestaurantDto } from './dto/create-restaurant/create-restaurant.dto';
import { FetchRestaurantsOfMerchantResponseDto } from './dto/fetch-restaurant/fetch-restaurant-response.dto';
import { FetchRestaurantDto } from './dto/fetch-restaurant/fetch-restaurant.dto';
import { IUserServiceFetchRestaurantsOfMerchantResponse } from './interfaces/user-service-fetch-restaurants-of-merchant-response.interface';

@Injectable()
export class RestaurantService {
  constructor(
    @Inject(constants.USER_SERVICE) private userServiceClient: ClientProxy,
    @Inject(constants.RESTAURANT_SERVICE) private restaurantServiceClient: ClientProxy,
  ) { }

  async createRestaurant(merchantId: string, createRestaurantDto: CreateRestaurantDto) {
    const isMerchantIdValid: boolean = await this.userServiceClient
      .send('validateMerchantId', merchantId)
      .toPromise();
    if (!isMerchantIdValid) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'MerchantId is not valid'
      };
    }
    const createRestaurantResponse = await this.restaurantServiceClient
      .send('createRestaurant', { merchantId, createRestaurantDto })
      .toPromise();
    const { status, message, data } = createRestaurantResponse;
    if (status !== HttpStatus.CREATED) {
      throw new HttpException({ message, }, status,);
    }
    return {
      statusCode: 201,
      message,
      data
    };
  }

  async fetchRestaurantsOfMerchant(merchantId: string, fetchRestaurantsOfMerchantDto: FetchRestaurantDto): Promise<FetchRestaurantsOfMerchantResponseDto> {
    const fetchRestaurantsOfMerchantResponse: IUserServiceFetchRestaurantsOfMerchantResponse
      = await this.userServiceClient
        .send('fetchRestaurantsOfMerchant', {
          merchantId,
          page: parseInt(fetchRestaurantsOfMerchantDto.page) || 0,
          size: parseInt(fetchRestaurantsOfMerchantDto.size) || 10
        })
        .toPromise();

    const { status, message, data } = fetchRestaurantsOfMerchantResponse;
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

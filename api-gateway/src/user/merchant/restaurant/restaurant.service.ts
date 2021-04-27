import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as constants from '../../../constants';
import {
  CreateStaffDto,
  CreateStaffResponseDto,
  FetchStaffByMerchantDto,
  FetchStaffByMerchantResponseDto
} from './dto';
import { IUserServiceCreateStaffResponse, IUserServiceFetchStaffByMerchantResponse } from './interfaces';
import { CreateRestaurantDto } from './dto/create-restaurant/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant/update-restaurant.dto';

@Injectable()
export class RestaurantService {

  constructor(
    @Inject(constants.USER_SERVICE) private userServiceClient: ClientProxy,
    @Inject(constants.RESTAURANT_SERVICE) private restaurantServiceClient: ClientProxy,
  ) { }

  async createStaff(merchantId: string, restaurantId: string, createStaffDto: CreateStaffDto): Promise<CreateStaffResponseDto> {
    const createStaffResponse: IUserServiceCreateStaffResponse = await this.userServiceClient
      .send('createStaff', { merchantId, restaurantId, data: createStaffDto })
      .toPromise();

    const { status, message, data } = createStaffResponse;
    if (status !== HttpStatus.CREATED) {
      throw new HttpException({ message, }, status,);
    }
    const { staff } = data;
    return {
      statusCode: 201,
      message,
      data: {
        staff
      }
    };
  }

  async fetchStaff(merchantId: string, restaurantId: string, fetchStaffByMerchantDto: FetchStaffByMerchantDto): Promise<FetchStaffByMerchantResponseDto> {
    const fetchStaffResponse: IUserServiceFetchStaffByMerchantResponse = await this.userServiceClient
      .send('fetchStaff', {
        merchantId,
        restaurantId,
        page: parseInt(fetchStaffByMerchantDto.page) || 0,
        size: parseInt(fetchStaffByMerchantDto.size) || 10
      })
      .toPromise();

    const { status, message, data } = fetchStaffResponse;
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

  async createRestaurant(merchantId: string, createRestaurantDto: CreateRestaurantDto) {
    const createRestaurantResponse = await this.restaurantServiceClient
      .send('createRestaurant', { merchantId, createRestaurantDto })
      .toPromise();

    const { status, message, restaurant } = createRestaurantResponse;
    // if (status !== HttpStatus.CREATED) {
    //   throw new HttpException({ message, }, status,);
    // }
    // TODO
    return {
      statusCode: 201,
      message,
      data: {
        restaurant
      },
    };
  }

  findAll() {
    return `This action returns all restaurant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}

import { ISimpleResponse } from './../../../shared/interfaces/simple-response.interface';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as constants from '../../../constants';
import {
  CreateStaffDto,
  CreateStaffResponseDto,
  DeleteStaffResponseDto,
  FetchStaffByMerchantResponseDto,
  PaginationDto,
  UpdateStaffDto,
  UpdateStaffResponseDto
} from './dto';
import { IUserServiceCreateStaffResponse, IUserServiceFetchStaffByMerchantResponse } from './interfaces';
import { CreateRestaurantDto } from './dto/create-restaurant/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant/update-restaurant.dto';
import { FetchRestaurantsOfMerchantResponseDto } from './dto/fetch-restaurant/fetch-restaurant-response.dto';
import { IUserServiceFetchRestaurantsOfMerchantResponse } from './interfaces/user-service-fetch-restaurants-of-merchant-response.interface';

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

  async updateStaff(staffId: string, merchantId: string, restaurantId: string, updateStaffDto: UpdateStaffDto): Promise<UpdateStaffResponseDto> {
    const updateStaffResponse: ISimpleResponse = await this.userServiceClient
      .send('updateStaff', { staffId, merchantId, restaurantId, data: updateStaffDto })
      .toPromise();

    const { status, message } = updateStaffResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message, }, status,);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
    };
  }

  async deleteStaff(staffId: string, merchantId: string, restaurantId: string): Promise<DeleteStaffResponseDto> {
    const deleteStaffResponse: ISimpleResponse = await this.userServiceClient
      .send('deleteStaff', { staffId, merchantId, restaurantId })
      .toPromise();

    const { status, message } = deleteStaffResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException({ message, }, status,);
    }

    return {
      statusCode: HttpStatus.OK,
      message,
    };
  }

  async fetchStaff(merchantId: string, restaurantId: string, fetchStaffByMerchantDto: PaginationDto): Promise<FetchStaffByMerchantResponseDto> {
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
    const { status, message, data } = createRestaurantResponse;
    // if (status !== HttpStatus.CREATED) {
    //   throw new HttpException({ message, }, status,);
    // }
    // TODO
    return {
      statusCode: 201,
      message,
      data
    };
  }

  async fetchRestaurantsOfMerchant(merchantId: string, fetchRestaurantsOfMerchantDto: PaginationDto): Promise<FetchRestaurantsOfMerchantResponseDto> {
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

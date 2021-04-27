import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as constants from '../../../constants';
import {
  CreateStaffDto,
  CreateStaffResponseDto,
  FetchStaffByMerchantDto,
  FetchStaffByMerchantResponseDto
} from '../../merchant/dto/index';
import { IUserServiceCreateStaffResponse, IUserServiceFetchStaffByMerchantResponse } from '../../merchant/interfaces/index';

@Injectable()
export class RestaurantService {

  constructor(
    @Inject(constants.USER_SERVICE) private userServiceClient: ClientProxy,
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
}

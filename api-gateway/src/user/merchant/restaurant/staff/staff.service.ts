import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as constants from '../../../../constants';
import { ISimpleResponse } from './../../../../shared/interfaces/simple-response.interface';
import {
  CreateStaffDto,
  CreateStaffResponseDto,
  DeleteStaffResponseDto,
  FetchStaffByMerchantResponseDto,
  FetchStaffDto,
  UpdateStaffDto,
  UpdateStaffResponseDto
} from './dto';
import { IUserServiceCreateStaffResponse, IUserServiceFetchStaffByMerchantResponse } from './interfaces';

@Injectable()
export class StaffService {
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

  async fetchStaff(merchantId: string, restaurantId: string, fetchStaffByMerchantDto: FetchStaffDto): Promise<FetchStaffByMerchantResponseDto> {
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

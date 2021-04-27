import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateMerchantDto,
  CreateMerchantResponseDto,
  CreateStaffDto,
  CreateStaffResponseDto,
  FetchStaffByMerchantDto,
  FetchStaffByMerchantResponseDto,
  FindMerchantByIdResponseDto,
} from '../merchant/dto/index';
import * as constants from '../../constants';
import { IMerchant, IUserServiceCreateMerchantResponse, IUserServiceCreateStaffResponse, IUserServiceFetchMerchantResponse, IUserServiceFetchStaffByMerchantResponse } from '../merchant/interfaces/index';
import { ISimpleResponse } from '../merchant/interfaces/index';

@Injectable()
export class MerchantService {

  constructor(
    @Inject(constants.USER_SERVICE) private userServiceClient: ClientProxy,
  ) { }

  async createMerchant(
    createMerchantDto: CreateMerchantDto,
  ): Promise<CreateMerchantResponseDto> {
    const createMerchantResponse: IUserServiceCreateMerchantResponse = await this.userServiceClient
      .send('createMerchant', createMerchantDto)
      .toPromise();

    const { status, message, user } = createMerchantResponse;
    if (status !== HttpStatus.CREATED) {
      throw new HttpException({ message, }, status,);
    }

    return {
      statusCode: 201,
      message,
      data: {
        user
      },
    };
  }

  async getAuthenticatedMerchant(username: string, password: string): Promise<IMerchant> {
    const authenticatedMerchantResponse: IUserServiceFetchMerchantResponse = await this.userServiceClient
      .send('getAuthenticatedMerchant', { username, password })
      .toPromise();
    const { message, user, status } = authenticatedMerchantResponse;
    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message
        },
        status,
      );
    }
    return user;
  }

  async findMerchantById(merchantId: string): Promise<FindMerchantByIdResponseDto> {
    const findMerchantById: IUserServiceFetchMerchantResponse = await this.userServiceClient
      .send('findMerchantById', merchantId)
      .toPromise();

    const { status, message, user } = findMerchantById;

    if (findMerchantById.status !== HttpStatus.OK) {
      throw new HttpException({ message }, status);
    }

    return {
      statusCode: 200,
      message,
      data: {
        user
      },
    };
  }

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

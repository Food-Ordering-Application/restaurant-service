import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as constants from '../../constants';
import {
  CreateMerchantDto,
  CreateMerchantResponseDto,
  FindMerchantByIdResponseDto
} from '../merchant/dto/index';
import { IMerchant, IUserServiceCreateMerchantResponse, IUserServiceFetchMerchantResponse } from '../merchant/interfaces/index';

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
}

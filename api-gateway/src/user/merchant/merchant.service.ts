import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateMerchantDto,
  CreateMerchantResponseDto,
} from '../merchant/dto/index';
import * as constants from '../../constants';
import { IMerchant } from '../merchant/interfaces/index';
import { IUserServiceResponse, ISimpleResponse } from '../merchant/interfaces/index';

@Injectable()
export class MerchantService {

  constructor(
    @Inject(constants.USER_SERVICE) private userServiceClient: ClientProxy,
  ) { }

  async createMerchant(
    createMerchantDto: CreateMerchantDto,
  ): Promise<CreateMerchantResponseDto> {
    const createMerchantResponse: IUserServiceResponse = await this.userServiceClient
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
    const authenticatedMerchantResponse: IUserServiceResponse = await this.userServiceClient
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

  // async findMerchantByPhoneNumber(phoneNumber: string): Promise<IUser> {
  //   const findMerchantResponse: IUserServiceResponse = await this.userServiceClient
  //     .send('findMerchantByPhoneNumber', phoneNumber)
  //     .toPromise();
  //   if (findMerchantResponse.status !== HttpStatus.OK) {
  //     throw new HttpException(
  //       {
  //         message: findMerchantResponse.message,
  //       },
  //       findMerchantResponse.status,
  //     );
  //   }
  //   return findMerchantResponse.user;
  // }

  // async findMerchantById(
  //   merchantId: string,
  // ): Promise<FindMerchantByIdResponseDto> {
  //   const findMerchantById: IUserServiceResponse = await this.userServiceClient
  //     .send('findMerchantById', merchantId)
  //     .toPromise();
  //   if (findMerchantById.status !== HttpStatus.OK) {
  //     throw new HttpException(
  //       {
  //         message: findMerchantById.message,
  //       },
  //       findMerchantById.status,
  //     );
  //   }
  //   return {
  //     statusCode: 200,
  //     message: findMerchantById.message,
  //     data: {
  //       user: findMerchantById.user,
  //     },
  //   };
  // }
}

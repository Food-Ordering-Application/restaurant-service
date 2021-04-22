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

  // async sendPhoneNumberOTPVerify(
  //   user: IUser,
  // ): Promise<SendPhoneNumberOTPVerifyResponseDto> {
  //   const sendPhoneNumberOTPVerifyResponse: ISimpleResponse = await this.userServiceClient
  //     .send('sendPhoneNumberOTPVerify', user)
  //     .toPromise();
  //   if (sendPhoneNumberOTPVerifyResponse.status !== HttpStatus.OK) {
  //     throw new HttpException(
  //       {
  //         message: sendPhoneNumberOTPVerifyResponse.message,
  //       },
  //       sendPhoneNumberOTPVerifyResponse.status,
  //     );
  //   }
  //   return {
  //     statusCode: 200,
  //     message: sendPhoneNumberOTPVerifyResponse.message,
  //   };
  // }

  // async verifyMerchantPhoneNumber(
  //   user: IUser,
  //   otp: string,
  // ): Promise<VerifyMerchantPhoneNumberResponseDto> {
  //   const verifyMerchantPhoneNumberResponse: ISimpleResponse = await this.userServiceClient
  //     .send('verifyMerchantPhoneNumber', { ...user, otp })
  //     .toPromise();
  //   if (verifyMerchantPhoneNumberResponse.status !== HttpStatus.OK) {
  //     throw new HttpException(
  //       {
  //         message: verifyMerchantPhoneNumberResponse.message,
  //       },
  //       verifyMerchantPhoneNumberResponse.status,
  //     );
  //   }
  //   return {
  //     statusCode: 200,
  //     message: verifyMerchantPhoneNumberResponse.message,
  //   };
  // }

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

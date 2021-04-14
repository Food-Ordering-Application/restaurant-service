import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as constants from '../constants';
import { IUserServiceCreateResponse } from './interfaces/user-service-create-customer-response.interface';
import { CreateCustomerResponseDto } from './dto/create-customer-response.dto';
import { IUser } from './interfaces/user.interface';
import { SendPhoneNumberOTPVerifyResponseDto } from './dto/send-otp-response.dto';
import { IUserServiceSendOTPVerifyCustomerResponse } from './interfaces/user-service-send-otp-verify-customer-response.dto';
import { VerifyCustomerPhoneNumberDto } from './dto/verify-customer-phone-number.dto';
import { VerifyCustomerPhoneNumberResponseDto } from './dto/verify-customer-phone-number-response.dto';
import { IUserServiceVerifyCustomerPhoneNumberResponse } from './interfaces/user-service-verify-customer-phone-number.interface';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(constants.USER_SERVICE) private userServiceClient: ClientProxy,
  ) {}

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CreateCustomerResponseDto> {
    const createCustomerResponse: IUserServiceCreateResponse = await this.userServiceClient
      .send('createCustomer', createCustomerDto)
      .toPromise();

    if (createCustomerResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createCustomerResponse.message,
        },
        createCustomerResponse.status,
      );
    }
    return {
      statusCode: 201,
      message: createCustomerResponse.message,
      data: {
        user: createCustomerResponse.user,
      },
    };
  }

  async sendPhoneNumberOTPVerify(
    user: IUser,
  ): Promise<SendPhoneNumberOTPVerifyResponseDto> {
    const sendPhoneNumberOTPVerifyResponse: IUserServiceSendOTPVerifyCustomerResponse = await this.userServiceClient
      .send('sendPhoneNumberOTPVerify', user)
      .toPromise();
    if (sendPhoneNumberOTPVerifyResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: sendPhoneNumberOTPVerifyResponse.message,
        },
        sendPhoneNumberOTPVerifyResponse.status,
      );
    }
    return {
      statusCode: 200,
      message: sendPhoneNumberOTPVerifyResponse.message,
    };
  }

  async verifyCustomerPhoneNumber(
    user: IUser,
    otp: string,
  ): Promise<VerifyCustomerPhoneNumberResponseDto> {
    const verifyCustomerPhoneNumberResponse: IUserServiceVerifyCustomerPhoneNumberResponse = await this.userServiceClient
      .send('verifyCustomerPhoneNumber', { ...user, otp })
      .toPromise();
    if (verifyCustomerPhoneNumberResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: verifyCustomerPhoneNumberResponse.message,
        },
        verifyCustomerPhoneNumberResponse.status,
      );
    }
    return {
      statusCode: 200,
      message: verifyCustomerPhoneNumberResponse.message,
    };
  }

  async findCustomerByPhoneNumber(phoneNumber: string): Promise<IUser> {
    const findCustomerResponse: IUserServiceCreateResponse = await this.userServiceClient
      .send('findCustomerByPhoneNumber', phoneNumber)
      .toPromise();
    if (findCustomerResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: findCustomerResponse.message,
        },
        findCustomerResponse.status,
      );
    }
    return findCustomerResponse.user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

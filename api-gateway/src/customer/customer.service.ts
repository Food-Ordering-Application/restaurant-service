import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as constants from '../constants';
import { IUserServiceCreateResponse } from './interfaces/user-service-create-response.interface';
import { CreateCustomerResponseDto } from './dto/create-customer-response.dto';

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

  findAll() {
    return `This action returns all user`;
  }

  async findCustomerByUsername(username: string) {
    const findCustomerResponse: IUserServiceCreateResponse = await this.userServiceClient
      .send('findCustomerByUsername', username)
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

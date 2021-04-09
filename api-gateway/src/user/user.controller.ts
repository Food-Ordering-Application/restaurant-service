import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Inject,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as constants from '../constants';
import { ClientProxy } from '@nestjs/microservices';
import { IUserServiceCreateResponse } from './interfaces/user-service-create-response.interface';

@Controller('user')
export class UserController {
  private logger = new Logger('UserController');

  constructor(
    @Inject(constants.USER_SERVICE) private userServiceClient: ClientProxy,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const createCustomerResponse: IUserServiceCreateResponse = await this.userServiceClient
      .send('createCustomer', createUserDto)
      .toPromise();
    if (createCustomerResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createCustomerResponse.message,
          data: null,
          errors: createCustomerResponse.errors,
        },
        createCustomerResponse.status,
      );
    }
    return {
      message: createCustomerResponse.message,
      data: {
        user: createCustomerResponse.user,
      },
      errors: null,
    };
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}

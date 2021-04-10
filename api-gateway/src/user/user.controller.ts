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
  ConflictException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as constants from '../constants';
import { ClientProxy } from '@nestjs/microservices';
import { IUserServiceCreateResponse } from './interfaces/user-service-create-response.interface';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateCustomerResponseDto } from './dto/create-customer-response.dto';

@ApiTags('customers')
@Controller('customer')
export class UserController {
  private logger = new Logger('UserController');

  constructor(
    @Inject(constants.USER_SERVICE) private userServiceClient: ClientProxy,
  ) {}

  @ApiCreatedResponse({ type: CreateCustomerResponseDto })
  @ApiBody({ type: CreateCustomerDto })
  @Post()
  async registerCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
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

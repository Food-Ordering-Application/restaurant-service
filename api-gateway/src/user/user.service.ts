import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as constants from '../constants';

@Injectable()
export class UserService {
  constructor(@Inject(constants.USER_SERVICE) private client: ClientProxy) {}

  async create(createUserDto: CreateCustomerDto) {
    return await this.client.send('createCustomer', createUserDto).toPromise();
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

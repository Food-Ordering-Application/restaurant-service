import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RESTAURANT_SERVICE } from 'src/constants';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @Inject(RESTAURANT_SERVICE) private restaurantServiceClient: ClientProxy,
  ) { }

  findAll() {
    return `This action returns all restaurant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RESTAURANT_SERVICE } from 'src/constants';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @Inject(RESTAURANT_SERVICE) private restaurantServiceClient: ClientProxy,
  ) { }

  async createRestaurant(merchantId: string, createRestaurantDto: CreateRestaurantDto) {
    const createRestaurantResponse = await this.restaurantServiceClient
      .send('createRestaurant', { merchantId, createRestaurantDto })
      .toPromise();

    const { status, message, restaurant } = createRestaurantResponse;
    if (status !== HttpStatus.CREATED) {
      throw new HttpException({ message, }, status,);
    }
    // TODO
    return {
      statusCode: 201,
      message,
      data: {
        restaurant
      },
    };
  }

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

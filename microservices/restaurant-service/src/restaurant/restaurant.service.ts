import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { RESTAURANT_EVENT } from 'src/constants';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities';

@Injectable()
export class RestaurantService {
  constructor(
    @Inject(RESTAURANT_EVENT) private restaurantEventClient: ClientProxy,
    @InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>,
  ) { }

  async create(dto: CreateRestaurantDto) {
    const { merchantId, createRestaurantDto } = dto;
    // TODO
    const restaurant = this.restaurantRepository.create({
      owner: merchantId,
      name: 'Test',
      phone: '091239021',
      geom: {
        type: 'Point',
        coordinates: [5.5, -5.5],
      }
    });
    const newRestaurant = await this.restaurantRepository.save(restaurant);
    this.restaurantEventClient.emit('restaurant_created', { merchantId, restaurantId: newRestaurant.id });
    return newRestaurant;
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

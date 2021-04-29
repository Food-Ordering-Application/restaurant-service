import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { RESTAURANT_EVENT } from 'src/constants';
import { Repository } from 'typeorm';
import { GetRestaurantInformationDto, GetSomeRestaurantDto } from './dto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Restaurant } from './entities';
import * as helpers from './helpers/helpers';
import { IRestaurantResponse, IRestaurantsResponse } from './interfaces';
import { ICreateRestaurantResponse } from './interfaces/create-restaurant-response.interface';


@Injectable()
export class RestaurantService {
  private readonly logger = new Logger('RestaurantService');
  constructor(
    @Inject(RESTAURANT_EVENT) private restaurantEventClient: ClientProxy,
    @InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>,
  ) { }

  async create(dto: CreateRestaurantDto): Promise<ICreateRestaurantResponse> {
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
    return {
      status: HttpStatus.CREATED,
      message: 'Restaurant was created',
      data: {
        restaurant: newRestaurant
      }
    };

  }

  async getSomeRestaurant(
    getSomeRestaurantDto: GetSomeRestaurantDto,
  ): Promise<IRestaurantsResponse> {
    const { area, pageNumber, category, search } = getSomeRestaurantDto;
    try {
      const restaurants = await helpers.createGetSomeRestaurantQuery(
        search,
        area,
        category,
        pageNumber,
        this.restaurantRepository,
      );
      return {
        status: HttpStatus.OK,
        message: 'Restaurant fetched successfully',
        restaurants: restaurants,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        restaurants: null,
      };
    }
  }

  async getRestaurantInformation(
    getRestaurantInformationDto: GetRestaurantInformationDto,
  ): Promise<IRestaurantResponse> {
    try {
      const restaurant = await this.restaurantRepository.findOne({
        id: getRestaurantInformationDto.restaurantId,
      });
      this.logger.log(restaurant);
      return {
        status: HttpStatus.OK,
        message: 'Restaurant fetched successfully',
        restaurant: restaurant,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        restaurant: null,
      };
    }
  }
}

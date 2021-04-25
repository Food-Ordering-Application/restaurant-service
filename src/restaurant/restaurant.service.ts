import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetRestaurantInformationDto, GetSomeRestaurantDto } from './dto';
import { Restaurant } from './entities';
import { IRestaurantResponse, IRestaurantsResponse } from './interfaces';
import * as helpers from './helpers/helpers';

@Injectable()
export class RestaurantService {
  private readonly logger = new Logger('CustomerService');

  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

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

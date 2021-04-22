import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetSomeRestaurantDto } from './dto';
import { Restaurant } from './entities';
import { IRestaurantsResponse } from './interfaces/get-multiple-restaurant-response.interface';

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
    try {
      let restaurants;
      if (!getSomeRestaurantDto.category) {
        restaurants = await this.restaurantRepository.find({
          select: ['name', 'isActive', 'address', 'coverImageUrl', 'id'],
          where: { area: getSomeRestaurantDto.area },
          relations: ['categories'],
          take: 25,
          skip: (getSomeRestaurantDto.pageNumber - 1) * 25,
        });
      } else {
        restaurants = await this.restaurantRepository
          .createQueryBuilder('res')
          .select([
            'res.name',
            'res.isActive',
            'res.address',
            'res.coverImageUrl',
            'res.id',
          ])
          .leftJoinAndSelect('res.categories', 'categories')
          .where('categories.type = :category AND res.area = :area', {
            category: getSomeRestaurantDto.category,
            area: getSomeRestaurantDto.area,
          })
          .limit(25)
          .skip((getSomeRestaurantDto.pageNumber - 1) * 25)
          .getMany();
      }
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
}

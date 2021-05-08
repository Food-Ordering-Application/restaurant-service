import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { USER_SERVICE } from 'src/constants';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { GetRestaurantInformationDto, GetSomeRestaurantDto } from './dto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantDto } from './dto/restaurant.dto';
import { Category, Restaurant } from './entities';
import { OpenHour } from './entities/openhours.entity';
import { RestaurantCreatedEventPayload } from './events/restaurant-created.event';
import { RestaurantProfileUpdatedEventPayload } from './events/restaurant-profile-updated.event';
import { IRestaurantResponse, IRestaurantsResponse } from './interfaces';
import { ICreateRestaurantResponse } from './interfaces/create-restaurant-response.interface';


@Injectable()
export class RestaurantService {
  private readonly logger = new Logger('RestaurantService');
  constructor(
    @Inject(USER_SERVICE) private userServiceClient: ClientProxy,
    @InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(OpenHour) private openHourRepository: Repository<OpenHour>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
  ) { }

  async handleRestaurantProfileUpdated(payload: RestaurantProfileUpdatedEventPayload) {
    const { restaurantId, data } = payload;
    const templateObject: {
      isVerified?: boolean,
      isActive?: boolean,
      isBanned?: boolean
    } = {
      isVerified: null,
      isActive: null,
      isBanned: null
    }
    Object.keys(data).forEach(key => typeof templateObject[key] == 'undefined' ? delete data[key] : {});
    await this.restaurantRepository.update(restaurantId, data);
  }

  async create(dto: CreateRestaurantDto): Promise<ICreateRestaurantResponse> {
    const { merchantId, createRestaurantDto } = dto;
    // TODO
    const {
      name, phone,
      address, area, city, geo,
      coverImageUrl, verifiedImageUrl, videoUrl = '',
      categories: categoriesData,
      openHours: openHoursData,
    } = createRestaurantDto;

    const categories: Category[] = categoriesData.map((category) => this.categoryRepository.create({ type: category }));
    const openHours: OpenHour[] = openHoursData.map(({ fromHour, fromMinute, toHour, toMinute, day }) => {
      return this.openHourRepository.create({ day, fromHour, fromMinute, toHour, toMinute });
    });

    const restaurant = this.restaurantRepository.create({
      owner: merchantId,
      name,
      phone,
      address,
      area,
      categories,
      coverImageUrl,
      verifiedImageUrl,
      videoUrl,
      city,
      geom: {
        type: 'Point',
        coordinates: [geo.latitude, geo.longitude]
      },
      openHours,
    })
    const newRestaurant = await this.restaurantRepository.save(restaurant);
    const { id, isActive, isBanned, isVerified } = newRestaurant;
    const restaurantCreatedEventPayload: RestaurantCreatedEventPayload = {
      merchantId,
      restaurantId: id,
      data: {
        name, phone, area, address, isActive, isBanned, isVerified, city
      }
    }

    this.userServiceClient.emit({ event: 'restaurant_created' }, restaurantCreatedEventPayload);
    return {
      status: HttpStatus.CREATED,
      message: 'Restaurant was created',
      data: {
        restaurant: RestaurantDto.EntityToDTO(newRestaurant)
      }
    };

  }

  async getSomeRestaurant(
    getSomeRestaurantDto: GetSomeRestaurantDto,
  ): Promise<IRestaurantsResponse> {
    const { area, page, size, category, search } = getSomeRestaurantDto;
    try {
      const pageSize = 0;
      let queryBuilder: SelectQueryBuilder<Restaurant> = this.restaurantRepository
        .createQueryBuilder('res')
        .select([
          'res.name',
          'res.isActive',
          'res.address',
          'res.coverImageUrl',
          'res.id',
          'res.rating',
        ])
        .leftJoinAndSelect('res.categories', 'categories')
        .where('res.area = :area', {
          area: area,
        }).andWhere('res.isActive = :active', {
          active: true
        }).andWhere('res.isBanned = :not_banned', {
          not_banned: false
        }).andWhere('res.isVerified = :verified', {
          verified: true
        })
      if (category) {
        queryBuilder = queryBuilder.where('categories.type = :categoryType', {
          categoryType: category,
        })
      }

      if (search) {
        queryBuilder = queryBuilder.where('res.name LIKE :restaurantName', {
          restaurantName: `%${search.toLowerCase()}%`,
        })
      }

      const restaurants = await queryBuilder.skip((page - 1) * size)
        .take(pageSize)
        .getMany();

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

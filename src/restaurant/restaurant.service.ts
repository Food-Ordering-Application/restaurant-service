import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { USER_SERVICE } from 'src/constants';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  FetchRestaurantDetailOfMerchantDto,
  FetchRestaurantsOfMerchantDto,
  GetRestaurantAddressInfoDto,
  GetRestaurantInformationDto,
  GetSomeRestaurantDto,
  RestaurantDetailForCustomerDto,
  RestaurantForCustomerDto,
} from './dto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantForMerchantDto } from './dto/restaurant-for-merchant.dto';
import { Category, Restaurant } from './entities';
import { OpenHour } from './entities/openhours.entity';
import { RestaurantCreatedEventPayload } from './events/restaurant-created.event';
import { RestaurantProfileUpdatedEventPayload } from './events/restaurant-profile-updated.event';
import {
  IFetchRestaurantDetailOfMerchantResponse,
  IFetchRestaurantsOfMerchantResponse,
  IGetRestaurantAddressResponse,
  IRestaurantResponse,
  IRestaurantsResponse,
} from './interfaces';
import { ICreateRestaurantResponse } from './interfaces/create-restaurant-response.interface';

@Injectable()
export class RestaurantService {
  private readonly logger = new Logger('RestaurantService');
  constructor(
    @Inject(USER_SERVICE) private userServiceClient: ClientProxy,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(OpenHour)
    private openHourRepository: Repository<OpenHour>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async handleRestaurantProfileUpdated(
    payload: RestaurantProfileUpdatedEventPayload,
  ) {
    const { restaurantId, data } = payload;
    const templateObject: {
      isVerified?: boolean;
      isActive?: boolean;
      isBanned?: boolean;
    } = {
      isVerified: null,
      isActive: null,
      isBanned: null,
    };
    Object.keys(data).forEach((key) =>
      typeof templateObject[key] == 'undefined' ? delete data[key] : {},
    );
    await this.restaurantRepository.update(restaurantId, data);
  }

  async create(dto: CreateRestaurantDto): Promise<ICreateRestaurantResponse> {
    const { merchantId, createRestaurantDto } = dto;
    // TODO
    const {
      name,
      phone,
      address,
      area,
      city,
      geo,
      coverImageUrl,
      verifiedImageUrl,
      videoUrl = '',
      categories: categoriesData,
      openHours: openHoursData,
    } = createRestaurantDto;

    const categories: Category[] = categoriesData.map((category) =>
      this.categoryRepository.create({ type: category }),
    );
    const openHours: OpenHour[] = openHoursData.map(
      ({ fromHour, fromMinute, toHour, toMinute, day }) => {
        return this.openHourRepository.create({
          day,
          fromHour,
          fromMinute,
          toHour,
          toMinute,
        });
      },
    );

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
        coordinates: [geo.latitude, geo.longitude],
      },
      openHours,
    });
    const newRestaurant = await this.restaurantRepository.save(restaurant);
    const { id, isActive, isBanned, isVerified } = newRestaurant;
    const restaurantCreatedEventPayload: RestaurantCreatedEventPayload = {
      merchantId,
      restaurantId: id,
      data: {
        name,
        phone,
        area,
        address,
        coverImageUrl,
        isActive,
        isBanned,
        isVerified,
        city,
      },
    };

    this.userServiceClient.emit(
      { event: 'restaurant_created' },
      restaurantCreatedEventPayload,
    );
    return {
      status: HttpStatus.CREATED,
      message: 'Restaurant was created',
      data: {
        restaurant: RestaurantForMerchantDto.EntityToDTO(newRestaurant),
      },
    };
  }

  async getSomeRestaurant(
    getSomeRestaurantDto: GetSomeRestaurantDto,
  ): Promise<IRestaurantsResponse> {
    const { area, page, size, category, search } = getSomeRestaurantDto;
    const pageSize = 0;
    let queryBuilder: SelectQueryBuilder<Restaurant> = this.restaurantRepository
      .createQueryBuilder('res')
      .select([
        'res.id',
        'res.name',
        'res.address',
        'res.coverImageUrl',
        'res.rating',
        'res.numRate',
      ])
      .leftJoinAndSelect('res.categories', 'categories')
      .where('res.area = :area', {
        area: area,
      })
      .andWhere('res.isActive = :active', {
        active: true,
      })
      .andWhere('res.isBanned = :not_banned', {
        not_banned: false,
      })
      .andWhere('res.isVerified = :verified', {
        verified: true,
      });
    if (category) {
      queryBuilder = queryBuilder.andWhere('categories.type = :categoryType', {
        categoryType: category,
      });
    }

    if (search) {
      queryBuilder = queryBuilder.andWhere('res.name iLIKE :restaurantName', {
        restaurantName: `%${search.toLowerCase()}%`,
      });
    }

    const restaurants = await queryBuilder
      .orderBy('res.rating', 'DESC')
      .addOrderBy('res.numRate', 'DESC')
      .skip((page - 1) * size)
      .take(pageSize)
      .getMany();

    return {
      status: HttpStatus.OK,
      message: 'Restaurant fetched successfully',
      data: {
        restaurants: restaurants.map(RestaurantForCustomerDto.EntityToDTO),
      },
    };
  }

  async getRestaurantInformation(
    getRestaurantInformationDto: GetRestaurantInformationDto,
  ): Promise<IRestaurantResponse> {
    const { restaurantId } = getRestaurantInformationDto;
    const doesRestaurantExist = await this.doesRestaurantExist(restaurantId);
    if (!doesRestaurantExist) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Restaurant not found',
        data: null,
      };
    }

    const restaurant = await this.restaurantRepository.findOne(
      {
        id: restaurantId,
      },
      { relations: ['categories', 'openHours'] },
    );

    return {
      status: HttpStatus.OK,
      message: 'Restaurant fetched successfully',
      data: {
        restaurant: RestaurantDetailForCustomerDto.EntityToDTO(restaurant),
      },
    };
  }

  async getRestaurantAddressInfo(
    getRestaurantAddressInfoDto: GetRestaurantAddressInfoDto,
  ): Promise<IGetRestaurantAddressResponse> {
    const { restaurantId } = getRestaurantAddressInfoDto;
    try {
      const restaurant = await this.restaurantRepository.findOne({
        id: restaurantId,
      });

      return {
        status: HttpStatus.OK,
        message: 'Restaurant address fetched successfully',
        data: {
          address: restaurant.address,
          geom: restaurant.geom,
        },
      };
    } catch (error) {
      this.logger.error(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        data: null,
      };
    }
  }

  async doesRestaurantExist(id: string): Promise<boolean> {
    return (await this.restaurantRepository.count({ id: id })) != 0;
  }

  async fetchRestaurantsOfMerchant(
    fetchRestaurantsOfMerchantDto: FetchRestaurantsOfMerchantDto,
  ): Promise<IFetchRestaurantsOfMerchantResponse> {
    const { merchantId, size, page } = fetchRestaurantsOfMerchantDto;

    const [results, total] = await this.restaurantRepository.findAndCount({
      where: [{ owner: merchantId }],
      take: size,
      skip: page * size,
      loadEagerRelations: false,
      order: { isVerified: 'ASC', isActive: 'ASC', created_at: 'ASC' },
    });

    return {
      status: HttpStatus.OK,
      message: 'Fetched restaurants successfully',
      data: {
        results: results.map((staff) =>
          RestaurantForMerchantDto.EntityToDTO(staff),
        ),
        size,
        total,
      },
    };
  }

  async fetchRestaurantDetailOfMerchant(
    fetchRestaurantDetailOfMerchantDto: FetchRestaurantDetailOfMerchantDto,
  ): Promise<IFetchRestaurantDetailOfMerchantResponse> {
    const { restaurantId, merchantId } = fetchRestaurantDetailOfMerchantDto;
    const doesRestaurantExist = await this.doesRestaurantExist(restaurantId);
    if (!doesRestaurantExist) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Restaurant not found',
        data: null,
      };
    }

    const restaurant = await this.restaurantRepository.findOne(
      {
        id: restaurantId,
      },
      { relations: ['categories', 'openHours'] },
    );

    return {
      status: HttpStatus.OK,
      message: 'Restaurant fetched successfully',
      data: {
        restaurant: RestaurantForMerchantDto.EntityToDTO(restaurant),
      },
    };
  }
}

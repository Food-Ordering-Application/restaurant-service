import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { USER_SERVICE } from 'src/constants';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { MenuItem, MenuItemTopping } from '../menu/entities';
import { DISTANCE_LIMIT } from './../constants';
import { GeoService } from './../geo/geo.service';
import { Position } from './../geo/types/position';
import {
  CreateRestaurantDto,
  FetchRestaurantDetailOfMerchantDto,
  FetchRestaurantsOfMerchantDto,
  GetRestaurantAddressInfoDto,
  GetRestaurantInformationDto,
  GetRestaurantInformationToCreateDeliveryDto,
  GetSomeRestaurantDto,
  RestaurantDetailForCustomerDto,
  RestaurantForCustomerDto,
  RestaurantForMerchantDto,
} from './dto';
import { CategoryDto } from './dto/category.dto';
import { GetMetaDataDto } from './dto/get-meta-data.dto';
import { Category, OpenHour, Restaurant } from './entities';
import { RestaurantFilterType } from './enums';
import { RestaurantSortType } from './enums/restaurant-sort-type.enum';
import {
  RestaurantCreatedEventPayload,
  RestaurantProfileUpdatedEventPayload,
} from './events';
import { DateTimeHelper } from './helpers/datetime.helper';
import {
  ICreateRestaurantResponse,
  IFetchRestaurantDetailOfMerchantResponse,
  IFetchRestaurantsOfMerchantResponse,
  IGetInformationForDeliveryResponse,
  IGetMetaDataResponse,
  IGetRestaurantAddressResponse,
  IRestaurantResponse,
  IRestaurantsResponse,
} from './interfaces';

@Injectable()
export class RestaurantService {
  private readonly logger = new Logger('RestaurantService');
  constructor(
    @Inject(USER_SERVICE) private userServiceClient: ClientProxy,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
    @InjectRepository(MenuItemTopping)
    private menuItemToppingRepository: Repository<MenuItemTopping>,
    @InjectRepository(OpenHour)
    private openHourRepository: Repository<OpenHour>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    private geoService: GeoService,
  ) {}

  async handleRestaurantProfileUpdated(
    payload: RestaurantProfileUpdatedEventPayload,
  ) {
    const { restaurantId, data } = payload;
    const templateObject: {
      isVerified?: boolean;
      isActive?: boolean;
      isBanned?: boolean;
      merchantIdInPayPal?: string;
    } = {
      isVerified: null,
      isActive: null,
      isBanned: null,
      merchantIdInPayPal: null,
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
      areaId,
      cityId,
      geo,
      coverImageUrl,
      verifiedImageUrl,
      videoUrl = '',
      categoryIds,
      openHours: openHoursData,
    } = createRestaurantDto;

    if (!categoryIds.length) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Restaurant must belong to at least 1 category',
        data: null,
      };
    }
    const categoriesPromise = this.categoryRepository.findByIds(categoryIds);
    const checkCityAndAreaPromise = this.geoService.validCityAndArea(
      cityId,
      areaId,
    );

    const [categories, validCityAndArea] = await Promise.all([
      categoriesPromise,
      checkCityAndAreaPromise,
    ]);

    if (categories.length != categoryIds.length) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'One of category Ids does not exists',
        data: null,
      };
    }

    if (!validCityAndArea) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'City and area id is not valid',
        data: null,
      };
    }

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
      areaId,
      categories,
      coverImageUrl,
      verifiedImageUrl,
      videoUrl,
      cityId,
      geom: Position.PositionToGeometry(geo),
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
        cityId,
        areaId,
        address,
        coverImageUrl,
        isActive,
        isBanned,
        isVerified,
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
    const {
      page,
      size = 10,
      cityId,
      search,
      areaIds,
      categoryIds,
      position,
      sortId,
      filterIds,
    } = getSomeRestaurantDto;
    const hasCategoryFilter =
      categoryIds && Array.isArray(categoryIds) && categoryIds.length;

    const hasAreaFilter = areaIds && Array.isArray(areaIds) && areaIds.length;

    const hasSort = sortId !== undefined && sortId !== null ? true : false;
    const validSort =
      hasSort && Object.values(RestaurantSortType).includes(sortId)
        ? true
        : false;

    const hasFilters =
      filterIds != null && Array.isArray(filterIds) && filterIds.length
        ? true
        : false;
    const validFilters =
      hasFilters &&
      filterIds.every((filterId) =>
        Object.values(RestaurantFilterType).includes(filterId),
      )
        ? true
        : false;

    const validPosition = Position.validPosition(position);

    if (hasSort && !validSort) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Sort id is not valid',
        data: null,
      };
    }

    if (hasFilters && !validFilters) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Filter ids is not valid',
        data: null,
      };
    }

    if (position != null && !validPosition) {
      if (hasSort && !validSort) {
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Position is not valid',
          data: null,
        };
      }
    }

    const hasOpeningFilter =
      hasFilters &&
      validFilters &&
      filterIds.includes(RestaurantFilterType.OPENING);

    let queryBuilder: SelectQueryBuilder<Restaurant> = this.restaurantRepository.createQueryBuilder(
      'res',
    );

    if (hasOpeningFilter) {
      const { condition, params } = DateTimeHelper.getIsOpeningCondition(
        'openHours',
      );
      queryBuilder = queryBuilder.leftJoinAndSelect(
        'res.openHours',
        'openHours',
        condition,
        params,
      );
    } else {
      const currentWeekDay = DateTimeHelper.getCurrentWeekDay();
      queryBuilder = queryBuilder.leftJoinAndSelect(
        'res.openHours',
        'openHours',
        'openHours.day = :currentDay',
        { currentDay: currentWeekDay },
      );
    }

    queryBuilder = hasCategoryFilter
      ? queryBuilder.leftJoinAndSelect(
          'res.categories',
          'categories',
          'categories.id IN (:...categoryIds)',
          { categoryIds },
        )
      : queryBuilder.leftJoinAndSelect('res.categories', 'categories');

    queryBuilder = queryBuilder
      .where('res.cityId = :cityId', {
        cityId: cityId,
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

    if (hasAreaFilter) {
      queryBuilder = queryBuilder.andWhere('res.areaId IN (:...areaIds)', {
        areaIds: areaIds,
      });
    }

    if (search) {
      queryBuilder = queryBuilder.andWhere('res.name iLIKE :restaurantName', {
        restaurantName: `%${search.toLowerCase()}%`,
      });
    }

    if (validPosition) {
      const { latitude, longitude } = position;
      // raw query
      // WHERE ST_DWithin('SRID=4326;POINT(106.649 10.7468)',geom,3000, true)
      queryBuilder = queryBuilder.andWhere(
        `ST_DWithin('SRID=4326;POINT(:longitude :latitude)', res.geom, :radius, true)`,
        { longitude: longitude, latitude: latitude, radius: DISTANCE_LIMIT },
      );
    }

    switch (sortId) {
      case RestaurantSortType.RATING: {
        queryBuilder = queryBuilder
          .orderBy('res.rating', 'DESC')
          .addOrderBy('res.numRate', 'DESC');
        break;
      }

      case RestaurantSortType.NEARBY: {
        const { longitude, latitude } = position;
        queryBuilder = queryBuilder.orderBy(
          `res.geom <-> 'SRID=4326;POINT(${longitude} ${latitude})'`,
        );
        break;
      }
    }

    filterIds.forEach((filterId) => {
      switch (filterId) {
        case RestaurantFilterType.OPENING: {
          // TODO
          break;
        }

        case RestaurantFilterType.PROMOTION: {
          // TODO
          break;
        }
      }
    });

    queryBuilder = queryBuilder
      .select([
        'res.id',
        'res.name',
        'res.address',
        'res.coverImageUrl',
        'res.rating',
        'res.numRate',
        'res.geom',
        'res.merchantIdInPayPal',
        'openHours',
      ])
      .skip((page - 1) * size)
      .take(size);

    const restaurants = await queryBuilder.getMany();

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
    const { restaurantId, customerId } = getRestaurantInformationDto;
    let queryBuilder: SelectQueryBuilder<Restaurant> = this.restaurantRepository
      .createQueryBuilder('res')
      .leftJoinAndSelect('res.categories', 'categories')
      .leftJoinAndSelect('res.openHours', 'openHours');

    if (customerId) {
      queryBuilder = queryBuilder.leftJoinAndSelect(
        'res.favoriteByUsers',
        'favoriteByUsers',
        'favoriteByUsers.customerId = :customerId',
        { customerId: customerId },
      );
    }

    queryBuilder = queryBuilder
      .where('res.id = :restaurantId', {
        restaurantId: restaurantId,
      })
      .andWhere('res.isActive = :active', {
        active: true,
      })
      .andWhere('res.isBanned = :not_banned', {
        not_banned: false,
      })
      .andWhere('res.isVerified = :verified', {
        verified: true,
      })
      .select(['res', 'openHours', 'categories', 'favoriteByUsers']);

    const restaurant = await queryBuilder.getOne();
    if (!restaurant) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Restaurant not found',
        data: null,
      };
    }

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
      //TODO: Lấy thông tin địa chỉ restaurant
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

  async getRestaurantInformationToCreateDelivery(
    getRestaurantInformationToCreateDeliveryDto: GetRestaurantInformationToCreateDeliveryDto,
  ): Promise<IGetInformationForDeliveryResponse> {
    try {
      const { restaurantId } = getRestaurantInformationToCreateDeliveryDto;

      const restaurant = await this.restaurantRepository
        .createQueryBuilder('restaurant')
        .where('restaurant.id = :restaurantId', {
          restaurantId: restaurantId,
        })
        .select([
          'restaurant.name',
          'restaurant.phone',
          'restaurant.address',
          'restaurant.geom',
        ])
        .getOne();

      if (!restaurant) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Restaurant not found',
          data: null,
        };
      }

      const { name, phone, geom, address } = restaurant;

      return {
        status: HttpStatus.OK,
        message: 'Fetch restaurant information successfully',
        data: {
          address: address,
          geom: geom,
          name: name,
          phoneNumber: phone,
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
      { relations: ['categories', 'openHours', 'city', 'area'] },
    );

    return {
      status: HttpStatus.OK,
      message: 'Restaurant fetched successfully',
      data: {
        restaurant: RestaurantForMerchantDto.EntityToDTO(restaurant),
      },
    };
  }
  async getMetaData(
    getMetaDataDto: GetMetaDataDto,
  ): Promise<IGetMetaDataResponse> {
    const response = await this.categoryRepository.find({
      order: { displayOrder: 'ASC' },
    });
    const categories = response.map(CategoryDto.EntityToDto);
    return {
      status: HttpStatus.OK,
      message: 'Fetched meta data successfully',
      data: {
        deliveryService: {
          serviceStartTime: '7:00',
          serviceEndTime: '22:00',
          maxDeliverTime: 60,
          minDeliverTime: 30,
          averageTimePer1km: 10,
          deliverEstimateTime: {
            merchantTime: 15,
            stepTime: 5,
          },
          closeTimeWarning: 1800, // 30'
          callCenter: '0949 111 222',
          distanceLimit: DISTANCE_LIMIT,
        },
        restaurantFilterType: [
          { id: RestaurantFilterType.OPENING, name: 'Đang mở' },
          { id: RestaurantFilterType.PROMOTION, name: 'Ưu đãi' },
        ],
        restaurantSortType: [
          {
            id: RestaurantSortType.NEARBY,
            name: 'Gần đây',
          },
          {
            id: RestaurantSortType.RATING,
            name: 'Đánh giá',
          },
        ],
        categories,
      },
    };
  }
}

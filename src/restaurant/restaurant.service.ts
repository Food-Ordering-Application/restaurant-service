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
  GetFavoriteRestaurantsDto,
  GetRestaurantAddressInfoDto,
  GetRestaurantInformationDto,
  GetRestaurantInformationToCreateDeliveryDto,
  GetSomeRestaurantDto,
  RestaurantDetailForCustomerDto,
  RestaurantForCustomerDto,
  RestaurantForMerchantDto,
  RestaurantSearchDto,
  UpdatedRestaurantDataDto,
  UpdateFavoriteRestaurantStatusDto,
  UpdateRestaurantDto,
  UpdateRestaurantRatingDto,
} from './dto';
import { CategoryDto } from './dto/category.dto';
import { GetMetaDataDto } from './dto/get-meta-data.dto';
import { Category, FavoriteRestaurant, OpenHour, Restaurant } from './entities';
import { RestaurantFilterType } from './enums';
import { RestaurantSortType } from './enums/restaurant-sort-type.enum';
import {
  RestaurantCreatedEventPayload,
  RestaurantProfileUpdatedEventPayload,
  RestaurantUpdatedEventPayload,
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
  IUpdateFavoriteRestaurantResponse,
} from './interfaces';
import { RestaurantElasticsearchService } from './search/restaurant-elasticsearch.service';
import { SortMode } from './search/restaurant-elasticsearch.type';

@Injectable()
export class RestaurantService {
  private readonly logger = new Logger('RestaurantService');
  constructor(
    @Inject(USER_SERVICE)
    private userServiceClient: ClientProxy,
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
    @InjectRepository(FavoriteRestaurant)
    private favoriteRestaurantRepository: Repository<FavoriteRestaurant>,

    private geoService: GeoService,

    private searchService: RestaurantElasticsearchService,
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
    this.handleRestaurantChangeSideEffect(restaurantId);
  }

  async handleRestaurantUpdatedSideEffect(restaurantId: string) {
    // invalidate cache
    const restaurant = await this.restaurantRepository.findOne({
      id: restaurantId,
    });
    const {
      owner: merchantId,
      id,
      name,
      phone,
      address,
      coverImageUrl,
      isActive,
      verifiedImageUrl,
      videoUrl,
    } = restaurant;
    const restaurantUpdatedEventPayload: RestaurantUpdatedEventPayload = {
      merchantId,
      restaurantId: id,
      data: {
        name,
        phone,
        address,
        coverImageUrl,
        isActive,
        verifiedImageUrl,
        videoUrl,
      },
    };

    this.userServiceClient.emit(
      { event: 'restaurant_updated' },
      restaurantUpdatedEventPayload,
    );
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
    this.handleRestaurantChangeSideEffect(id);
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
      page = 1,
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
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Position is not valid',
        data: null,
      };
    }

    if (!position && sortId == RestaurantSortType.NEARBY) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'You need to provide location to sort nearby',
        data: null,
      };
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
      queryBuilder = queryBuilder.innerJoinAndSelect(
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
      ? queryBuilder.innerJoinAndSelect(
          'res.categories',
          'categories',
          'categories.id IN (:...categoryIds)',
          { categoryIds },
        )
      : // : queryBuilder.leftJoinAndSelect('res.categories', 'categories');
        queryBuilder;

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
      queryBuilder = queryBuilder
        .andWhere(
          `ST_DWithin(ST_GeomFromGeoJSON(:origin)::geography::geometry, res.geom, :radius, true)`,
          {
            radius: DISTANCE_LIMIT,
          },
        )
        .setParameters({
          origin: JSON.stringify(
            Position.PositionToGeometry({ latitude, longitude }),
          ),
        });
    }
    switch (sortId) {
      case RestaurantSortType.RATING: {
        queryBuilder = queryBuilder
          .orderBy('res.rating', 'DESC')
          .addOrderBy('res.numRate', 'DESC');
        break;
      }

      case RestaurantSortType.NEARBY: {
        const { latitude, longitude } = position;
        // TODO: improve this
        // queryBuilder = queryBuilder.orderBy(
        //   `ST_Distance(res.geom, ST_GeomFromGeoJSON(:origin)::geography::geometry)`,
        // );
        // queryBuilder = queryBuilder
        //   // .orderBy({
        //   //   'ST_Distance(res.geom, ST_GeomFromGeoJSON(:origin)::geography::geometry)': {
        //   //     order: 'ASC',
        //   //   },
        //   // });
        //   .orderBy(
        //     `res.geom <-> ST_GeomFromGeoJSON(:origin)::geography::geometry`,
        //   );
        break;
      }
    }

    if (hasFilters && validFilters) {
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
    }

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
      // .offset((page - 1) * size)
      // .limit(size);
      .skip((page - 1) * size)
      .take(size);
    // console.log(queryBuilder.getSql(), queryBuilder.getParameters());
    const restaurants = await queryBuilder.getMany();

    // console.dir({ restaurants }, { depth: 3 });
    return {
      status: HttpStatus.OK,
      message: 'Restaurant fetched successfully',
      data: {
        restaurants: restaurants.map((restaurant) =>
          RestaurantForCustomerDto.EntityToDTO(restaurant),
        ),
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
      });

    if (customerId) {
      queryBuilder = queryBuilder.select([
        'res',
        'openHours',
        'categories',
        'favoriteByUsers',
      ]);
    } else {
      queryBuilder = queryBuilder.select(['res', 'openHours', 'categories']);
    }

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
    const { merchantId, size = 10, page = 1 } = fetchRestaurantsOfMerchantDto;

    const [results, total] = await this.restaurantRepository.findAndCount({
      where: [{ owner: merchantId }],
      take: size,
      skip: page * size,
      loadEagerRelations: false,
      order: { isVerified: 'DESC', isActive: 'DESC', created_at: 'ASC' },
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
    // const doesRestaurantExist = await this.doesRestaurantExist(restaurantId);
    const restaurant = await this.getRestaurantById(restaurantId);
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
          // { id: RestaurantFilterType.PROMOTION, name: 'Ưu đãi' },
        ],
        restaurantSortType: [
          {
            id: RestaurantSortType.RELEVANCE,
            name: 'Liên quan',
          },
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

  async updateFavoriteRestaurant(
    updateFavoriteRestaurantDto: UpdateFavoriteRestaurantStatusDto,
  ): Promise<IUpdateFavoriteRestaurantResponse> {
    const {
      customerId,
      restaurantId,
      isFavorite,
    } = updateFavoriteRestaurantDto;

    const queryBuilder = this.favoriteRestaurantRepository
      .createQueryBuilder('favorite')
      .where('favorite.customerId = :customerId', {
        customerId: customerId,
      })
      .andWhere('favorite.restaurantId = :restaurantId', {
        restaurantId: restaurantId,
      });

    const favoriteStatus = await queryBuilder.getOne();
    const isCurrentFavorite = favoriteStatus == null ? false : true;

    if (isCurrentFavorite == isFavorite) {
      return {
        status: HttpStatus.OK,
        message: 'Nothing to update',
      };
    }

    try {
      if (isFavorite) {
        const newFavoriteStatus = this.favoriteRestaurantRepository.create({
          customerId,
          restaurantId,
        });
        await this.favoriteRestaurantRepository.save(newFavoriteStatus);
      } else {
        await this.favoriteRestaurantRepository.remove(favoriteStatus);
      }

      return {
        status: HttpStatus.OK,
        message: (isFavorite ? 'Like' : 'Unlike') + ' restaurant successfully',
      };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      };
    }
  }

  async getFavoriteRestaurants(
    getFavoriteRestaurantsDto: GetFavoriteRestaurantsDto,
  ): Promise<IRestaurantsResponse> {
    const {
      customerId,
      page: pageData,
      size: sizeData,
    } = getFavoriteRestaurantsDto;
    const page = pageData || 1;
    const size = sizeData || 10;

    let logicQueryBuilder: SelectQueryBuilder<Restaurant> = this.restaurantRepository.createQueryBuilder(
      'res',
    );

    logicQueryBuilder = logicQueryBuilder.innerJoinAndSelect(
      'res.favoriteByUsers',
      'favorite',
      'favorite.customerId = :customerId',
      {
        customerId: customerId,
      },
    );

    logicQueryBuilder = logicQueryBuilder
      .where('res.isActive = :active', {
        active: true,
      })
      .andWhere('res.isBanned = :not_banned', {
        not_banned: false,
      })
      .andWhere('res.isVerified = :verified', {
        verified: true,
      });
    logicQueryBuilder = logicQueryBuilder
      .groupBy('res.id')
      .addGroupBy('favorite.created_at');
    logicQueryBuilder = logicQueryBuilder.orderBy(
      'favorite.created_at',
      'DESC',
    );
    logicQueryBuilder = logicQueryBuilder.select(['res.id']);
    logicQueryBuilder = logicQueryBuilder.offset((page - 1) * size).limit(size);

    const idResponses = await logicQueryBuilder.getMany();
    const ids = idResponses.map(({ id }) => id);
    const restaurants = await this.getRestaurantsByIds(ids);
    return {
      status: HttpStatus.OK,
      message: 'Fetched favorite restaurant successfully',
      data: {
        restaurants: restaurants.map((restaurant) =>
          RestaurantForCustomerDto.EntityToDTO(restaurant),
        ),
      },
    };
  }

  async getRestaurantsByIds(ids: string[]): Promise<Restaurant[]> {
    if (!ids.length) {
      return [];
    }
    let queryBuilder: SelectQueryBuilder<Restaurant> = this.restaurantRepository.createQueryBuilder(
      'res',
    );
    const currentWeekDay = DateTimeHelper.getCurrentWeekDay();
    queryBuilder = queryBuilder.leftJoinAndSelect(
      'res.openHours',
      'openHours',
      'openHours.day = :currentDay',
      { currentDay: currentWeekDay },
    );
    queryBuilder = queryBuilder.where('res.id IN (:...ids)', { ids: ids });
    queryBuilder = queryBuilder.select(['res', 'openHours']);
    const restaurants = await queryBuilder.getMany();
    const result = ids.map((id) => restaurants.find((r) => r.id == id));
    return result;
  }

  async getRestaurantById(id: string): Promise<Restaurant> {
    let queryBuilder: SelectQueryBuilder<Restaurant> = this.restaurantRepository.createQueryBuilder(
      'res',
    );
    queryBuilder = queryBuilder
      .leftJoinAndSelect('res.categories', 'categories')
      .leftJoinAndSelect('res.openHours', 'openHours')
      .leftJoinAndSelect('res.city', 'city')
      .leftJoinAndSelect('res.area', 'area');
    queryBuilder = queryBuilder.where('res.id = :id', { id: id });
    queryBuilder = queryBuilder.select([
      'res',
      'openHours',
      'categories',
      'city',
      'area',
    ]);
    return queryBuilder.getOne();
  }

  async update(updateRestaurantDto: UpdateRestaurantDto) {
    const {
      data,
      merchantId,
      // restaurantId,
      // merchantId,
      restaurantId,
    } = updateRestaurantDto;

    const fetchCountRestaurant = await this.restaurantRepository.count({
      id: restaurantId,
      owner: merchantId,
      // menuId: menuId,
    });
    if (fetchCountRestaurant === 0) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Restaurant not found',
      };
    }
    // remove unwanted field
    const templateObject: UpdatedRestaurantDataDto = {
      name: null,
      isActive: null,
      address: null,
      coverImageUrl: null,
      geo: null,
      phone: null,
      verifiedImageUrl: null,
      videoUrl: null,
    };
    Object.keys(data).forEach((key) =>
      typeof templateObject[key] == undefined ? delete data[key] : {},
    );

    let geom = null;
    if (data.geo) {
      geom = Position.PositionToGeometry(data?.geo);
      delete data.geo;
    }

    // save to database
    try {
      await this.restaurantRepository.update(
        { id: restaurantId },
        {
          ...data,
          ...(geom && {
            geom: geom,
          }),
        },
      );
      this.handleRestaurantUpdatedSideEffect(restaurantId);
      this.handleRestaurantChangeSideEffect(restaurantId);
      return {
        status: HttpStatus.OK,
        message: 'Restaurant updated successfully',
      };
    } catch (e) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      };
    }
  }

  async updateRestaurantRating(
    updateRestaurantRatingDto: UpdateRestaurantRatingDto,
  ) {
    const { restaurantId, rateCount, avgRating } = updateRestaurantRatingDto;
    try {
      const { affected } = await this.restaurantRepository.update(
        { id: restaurantId },
        {
          numRate: rateCount,
          rating: Math.round(avgRating * 10) / 10,
        },
      );
      if (!affected) {
        this.logger.error(
          `Error to update rating of restaurant ${restaurantId}`,
        );
      } else {
        this.handleRestaurantChangeSideEffect(restaurantId);
      }
    } catch (e) {
      this.logger.error(
        `Error to update rating of restaurant ${restaurantId}: ${e.message}`,
      );
    }
  }

  async searchRestaurant(
    getSomeRestaurantDto: GetSomeRestaurantDto,
  ): Promise<IRestaurantsResponse> {
    const {
      page = 1,
      size = 10,
      cityId,
      search,
      areaIds,
      categoryIds,
      position,
      sortId,
      filterIds,
    } = getSomeRestaurantDto;

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
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Position is not valid',
        data: null,
      };
    }

    if (!position && sortId == RestaurantSortType.NEARBY) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'You need to provide location to sort nearby',
        data: null,
      };
    }

    const hasOpeningFilter =
      hasFilters &&
      validFilters &&
      filterIds.includes(RestaurantFilterType.OPENING);

    const mode: SortMode =
      sortId == RestaurantSortType.NEARBY
        ? 'NEARBY'
        : sortId == RestaurantSortType.RATING
        ? 'RATING'
        : 'RELEVANCE';

    const searchResult = await this.searchService.searchRestaurant(mode, {
      query: search,
      areaIds,
      categoryIds,
      isFilterOpenRestaurant: hasOpeningFilter,
      cityId: cityId,
      location: position,
      distance: 10,
      offset: (page - 1) * size,
      limit: size,
    });
    const restaurantIds = searchResult.map(({ id }) => id);
    const restaurants = await this.getRestaurantsByIds(restaurantIds);
    console.log({ searchResult, restaurantIds });
    return {
      status: HttpStatus.OK,
      message: 'Restaurant fetched successfully',
      data: {
        restaurants: restaurants.map((restaurant, index) =>
          RestaurantForCustomerDto.EntityToDTO(
            restaurant,
            searchResult[index]?.menuItems,
          ),
        ),
      },
    };
  }

  async handleRestaurantChangeSideEffect(restaurantId: string) {
    try {
      const queryBuilder = this.restaurantRepository.createQueryBuilder('res');

      const getRestaurant = queryBuilder
        .leftJoinAndSelect('res.menu', 'menu')
        .leftJoinAndSelect('res.categories', 'categories')
        .leftJoinAndSelect('res.openHours', 'openHours')
        .leftJoinAndSelect('menu.menuItems', 'menuItems')
        .where('res.id = :restaurantId', {
          restaurantId: restaurantId,
        });

      const restaurant = await getRestaurant.getOne();
      const data = RestaurantSearchDto.fromEntity(restaurant);
      await this.searchService.updateRestaurant(restaurantId, data);
    } catch (e) {
      console.log('Error when sync restaurant: ' + e.message);
    }
  }
}

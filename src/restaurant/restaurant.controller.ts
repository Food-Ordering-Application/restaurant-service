import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import {
  GetSomeRestaurantDto,
  GetRestaurantInformationDto,
  FetchRestaurantsOfMerchantDto,
  FetchRestaurantDetailOfMerchantDto,
  GetRestaurantInformationToCreateDeliveryDto,
  UpdateFavoriteRestaurantStatusDto,
  GetFavoriteRestaurantsDto,
  UpdateRestaurantDto,
  UpdateRestaurantRatingDto,
} from './dto';
import {
  IRestaurantResponse,
  IRestaurantsResponse,
  ICreateRestaurantResponse,
  IFetchRestaurantsOfMerchantResponse,
  IFetchRestaurantDetailOfMerchantResponse,
  IGetRestaurantAddressResponse,
  IGetInformationForDeliveryResponse,
  IGetMetaDataResponse,
  IUpdateFavoriteRestaurantResponse,
} from './interfaces';
import { RestaurantService } from './restaurant.service';
import { RestaurantProfileUpdatedEventPayload } from './events/restaurant-profile-updated.event';
import { GetRestaurantAddressInfoDto } from './dto/get-restaurant-address-info.dto';
import { GetMetaDataDto } from './dto/get-meta-data.dto';

@Controller()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @MessagePattern('createRestaurant')
  createRestaurant(
    @Payload() createRestaurantDto: CreateRestaurantDto,
  ): Promise<ICreateRestaurantResponse> {
    return this.restaurantService.create(createRestaurantDto);
  }

  @MessagePattern('fetchRestaurantsOfMerchant')
  async fetchRestaurantsOfMerchant(
    @Payload() fetchRestaurantsOfMerchantDto: FetchRestaurantsOfMerchantDto,
  ): Promise<IFetchRestaurantsOfMerchantResponse> {
    return await this.restaurantService.fetchRestaurantsOfMerchant(
      fetchRestaurantsOfMerchantDto,
    );
  }

  @MessagePattern('fetchRestaurantDetailOfMerchant')
  async fetchRestaurantDetailOfMerchant(
    @Payload()
    fetchRestaurantDetailOfMerchantDto: FetchRestaurantDetailOfMerchantDto,
  ): Promise<IFetchRestaurantDetailOfMerchantResponse> {
    return this.restaurantService.fetchRestaurantDetailOfMerchant(
      fetchRestaurantDetailOfMerchantDto,
    );
  }

  @MessagePattern('getSomeRestaurant')
  getSomeRestaurant(
    @Payload() getSomeRestaurantDto: GetSomeRestaurantDto,
  ): Promise<IRestaurantsResponse> {
    return this.restaurantService.getSomeRestaurant(getSomeRestaurantDto);
  }

  @MessagePattern('searchRestaurant')
  searchRestaurant(
    @Payload() getSomeRestaurantDto: GetSomeRestaurantDto,
  ): Promise<IRestaurantsResponse> {
    return this.restaurantService.searchRestaurant(getSomeRestaurantDto);
  }

  @MessagePattern('getRestaurantInformation')
  getRestaurantInformation(
    @Payload() getRestaurantInformationDto: GetRestaurantInformationDto,
  ): Promise<IRestaurantResponse> {
    return this.restaurantService.getRestaurantInformation(
      getRestaurantInformationDto,
    );
  }

  @EventPattern({ event: 'restaurant_profile_updated' })
  async handleRestaurantProfileUpdated(
    data: RestaurantProfileUpdatedEventPayload,
  ) {
    return await this.restaurantService.handleRestaurantProfileUpdated(data);
  }

  @MessagePattern('getRestaurantAddressInfo')
  getRestaurantAddressInfo(
    @Payload()
    getRestaurantAddressInfoDto: GetRestaurantAddressInfoDto,
  ): Promise<IGetRestaurantAddressResponse> {
    return this.restaurantService.getRestaurantAddressInfo(
      getRestaurantAddressInfoDto,
    );
  }

  @MessagePattern('getRestaurantInformationToCreateDelivery')
  getRestaurantInformationToCreateDelivery(
    @Payload()
    getRestaurantInformationToCreateDeliveryDto: GetRestaurantInformationToCreateDeliveryDto,
  ): Promise<IGetInformationForDeliveryResponse> {
    return this.restaurantService.getRestaurantInformationToCreateDelivery(
      getRestaurantInformationToCreateDeliveryDto,
    );
  }

  @MessagePattern('getMetaData')
  async getMetaData(
    @Payload() getMetaDataDto: GetMetaDataDto,
  ): Promise<IGetMetaDataResponse> {
    return await this.restaurantService.getMetaData(getMetaDataDto);
  }

  @MessagePattern('updateFavoriteRestaurant')
  async updateFavoriteRestaurant(
    @Payload() updateFavoriteRestaurantDto: UpdateFavoriteRestaurantStatusDto,
  ): Promise<IUpdateFavoriteRestaurantResponse> {
    return await this.restaurantService.updateFavoriteRestaurant(
      updateFavoriteRestaurantDto,
    );
  }

  @MessagePattern('getFavoriteRestaurants')
  async getFavoriteRestaurants(
    @Payload() getFavoriteRestaurantsDto: GetFavoriteRestaurantsDto,
  ): Promise<IRestaurantsResponse> {
    return await this.restaurantService.getFavoriteRestaurants(
      getFavoriteRestaurantsDto,
    );
  }

  @MessagePattern('updateRestaurant')
  async update(@Payload() updateRestaurantDto: UpdateRestaurantDto) {
    return await this.restaurantService.update(updateRestaurantDto);
  }

  @EventPattern('updateRestaurantRating')
  async updateRestaurantRating(
    @Payload() updateRestaurantRatingDto: UpdateRestaurantRatingDto,
  ) {
    return await this.restaurantService.updateRestaurantRating(
      updateRestaurantRatingDto,
    );
  }
}

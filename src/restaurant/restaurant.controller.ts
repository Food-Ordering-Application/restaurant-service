import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import {
  GetSomeRestaurantDto,
  GetRestaurantInformationDto,
  FetchRestaurantsOfMerchantDto,
  FetchRestaurantDetailOfMerchantDto,
  GetRestaurantInformationToCreateDeliveryDto,
} from './dto';
import {
  IRestaurantResponse,
  IRestaurantsResponse,
  ICreateRestaurantResponse,
  IFetchRestaurantsOfMerchantResponse,
  IFetchRestaurantDetailOfMerchantResponse,
  IGetRestaurantAddressResponse,
  IGetInformationForDeliveryResponse,
} from './interfaces';
import { RestaurantService } from './restaurant.service';
import { RestaurantProfileUpdatedEventPayload } from './events/restaurant-profile-updated.event';
import { GetRestaurantAddressInfoDto } from './dto/get-restaurant-address-info.dto';

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
}

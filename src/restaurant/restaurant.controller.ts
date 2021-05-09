import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { GetSomeRestaurantDto, GetRestaurantInformationDto } from './dto';
import { IRestaurantResponse, IRestaurantsResponse } from './interfaces';
import { RestaurantService } from './restaurant.service';
import { ICreateRestaurantResponse } from './interfaces/create-restaurant-response.interface';
import { RestaurantProfileUpdatedEventPayload } from './events/restaurant-profile-updated.event';

@Controller()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @MessagePattern('createRestaurant')
  createRestaurant(
    @Payload() createRestaurantDto: CreateRestaurantDto,
  ): Promise<ICreateRestaurantResponse> {
    return this.restaurantService.create(createRestaurantDto);
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
  async handleRestaurantProfileUpdated(data: RestaurantProfileUpdatedEventPayload) {
    return await this.restaurantService.handleRestaurantProfileUpdated(data);
  }
}

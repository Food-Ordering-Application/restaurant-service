import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetSomeRestaurantDto, GetRestaurantInformationDto } from './dto';
import { IRestaurantResponse, IRestaurantsResponse } from './interfaces';
import { RestaurantService } from './restaurant.service';

@Controller()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @MessagePattern('getSomeRestaurant')
  getSomeRestaurant(
    @Payload() getSomeRestaurantDto: GetSomeRestaurantDto,
  ): Promise<IRestaurantsResponse> {
    console.log(15, 'getSomeRestaurant')
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
}

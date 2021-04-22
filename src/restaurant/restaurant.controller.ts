import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetSomeRestaurantDto } from './dto';
import { RestaurantService } from './restaurant.service';

@Controller()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @MessagePattern('getSomeRestaurant')
  getSomeRestaurant(@Payload() getSomeRestaurantDto: GetSomeRestaurantDto) {
    return this.restaurantService.getSomeRestaurant(getSomeRestaurantDto);
  }
}

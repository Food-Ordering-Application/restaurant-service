import { Controller } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { RestaurantService } from './restaurant.service';

@ApiTags('restaurants')
@ApiInternalServerErrorResponse({ type: ApiInternalServerErrorResponse })
@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }
}

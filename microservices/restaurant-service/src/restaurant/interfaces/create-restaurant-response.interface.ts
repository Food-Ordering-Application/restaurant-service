import { RestaurantDto } from '../dto/restaurant.dto';
import { IRestaurant } from './restaurant.interface';

export interface ICreateRestaurantResponse {
  status: number;
  message: string;
  data: {
    restaurant: RestaurantDto;
  }
}

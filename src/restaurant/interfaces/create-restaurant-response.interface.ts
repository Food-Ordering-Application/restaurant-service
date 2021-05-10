import { RestaurantDto } from '../dto/restaurant.dto';
export interface ICreateRestaurantResponse {
  status: number;
  message: string;
  data: {
    restaurant: RestaurantDto;
  };
}

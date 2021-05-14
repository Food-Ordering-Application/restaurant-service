import { RestaurantDetailForCustomerDto } from './../dto';
export interface IRestaurantResponse {
  status: number;
  message: string;
  restaurant: RestaurantDetailForCustomerDto;
}

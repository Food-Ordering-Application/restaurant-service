import { RestaurantForCustomerDto } from './../dto';
export interface IRestaurantResponse {
  status: number;
  message: string;
  restaurant: RestaurantForCustomerDto;
}

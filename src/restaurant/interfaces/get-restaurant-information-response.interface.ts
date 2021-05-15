import { RestaurantDetailForCustomerDto } from './../dto';
export interface IRestaurantDetailResponse {
  status: number;
  message: string;
  data: {
    restaurant: RestaurantDetailForCustomerDto;
  };
}

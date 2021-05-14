import { RestaurantForCustomerDto } from '../dto';

export interface IRestaurantsResponse {
  status: number;
  message: string;
  data: {
    restaurants: RestaurantForCustomerDto[];
  };
}

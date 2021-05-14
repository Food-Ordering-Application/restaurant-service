import { RestaurantForMerchantDto } from '../dto/restaurant-for-merchant.dto';
export interface ICreateRestaurantResponse {
  status: number;
  message: string;
  data: {
    restaurant: RestaurantForMerchantDto;
  };
}

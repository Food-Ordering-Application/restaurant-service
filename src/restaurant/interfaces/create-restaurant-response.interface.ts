import { RestaurantOfMerchantDto } from '../dto/restaurant-of-merchant.dto';
export interface ICreateRestaurantResponse {
  status: number;
  message: string;
  data: {
    restaurant: RestaurantOfMerchantDto;
  };
}

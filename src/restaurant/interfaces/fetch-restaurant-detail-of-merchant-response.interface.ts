import { RestaurantOfMerchantDto } from '../dto';

export interface IFetchRestaurantDetailOfMerchantResponse {
  status: number;
  message: string;
  data: {
    restaurant: RestaurantOfMerchantDto;
  };
}

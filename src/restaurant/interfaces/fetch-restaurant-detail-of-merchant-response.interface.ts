import { RestaurantForMerchantDto } from '../dto';

export interface IFetchRestaurantDetailOfMerchantResponse {
  status: number;
  message: string;
  data: {
    restaurant: RestaurantForMerchantDto;
  };
}

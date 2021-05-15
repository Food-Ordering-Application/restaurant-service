import { RestaurantForMerchantDto } from '../dto';

export interface IFetchRestaurantsOfMerchantResponse {
  status: number;
  message: string;
  data: {
    results: RestaurantForMerchantDto[];
    total: number;
    size: number;
  };
}

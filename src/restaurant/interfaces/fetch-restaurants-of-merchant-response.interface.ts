import { RestaurantOfMerchantDto } from '../dto';

export interface IFetchRestaurantsOfMerchantResponse {
  status: number;
  message: string;
  data: {
    results: RestaurantOfMerchantDto[];
    total: number;
    size: number;
  };
}

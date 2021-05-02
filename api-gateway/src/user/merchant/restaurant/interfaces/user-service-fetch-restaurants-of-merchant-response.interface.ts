import { IRestaurantProfile } from './restaurant.interface';
export interface IUserServiceFetchRestaurantsOfMerchantResponse {
  status: number;
  message: string;
  data: {
    results: IRestaurantProfile[],
    total: number,
    size: number,
  };
}

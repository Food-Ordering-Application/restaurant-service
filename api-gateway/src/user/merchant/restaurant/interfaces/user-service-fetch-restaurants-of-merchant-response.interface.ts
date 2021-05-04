import { IRestaurantProfile } from './restaurant-profile.interface';
export interface IUserServiceFetchRestaurantsOfMerchantResponse {
  status: number;
  message: string;
  data: {
    results: IRestaurantProfile[],
    total: number,
    size: number,
  };
}

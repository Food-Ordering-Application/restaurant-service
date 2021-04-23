import { IRestaurant } from './restaurant.interface';

export interface IRestaurantResponse {
  status: number;
  message: string;
  restaurant: IRestaurant | null;
  // errors: { [key: string]: any };
}

import { IRestaurant } from './restaurant.interface';

export interface IRestaurantsResponse {
  status: number;
  message: string;
  restaurants: IRestaurant[] | null;
  // errors: { [key: string]: any };
}

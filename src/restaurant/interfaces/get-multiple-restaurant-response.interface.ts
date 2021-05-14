import { IRestaurant } from './restaurant.interface';

export interface IRestaurantsResponse {
  status: number;
  message: string;
  data: {
    restaurants: IRestaurant[] | null;
  };
}

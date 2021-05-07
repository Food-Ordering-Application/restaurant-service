import { IMenu } from './menu.interface';
export interface IRestaurantServiceFetchMenuOfRestaurantResponse {
  status: number;
  message: string;
  data: {
    results: IMenu[],
    total: number,
    size: number,
  };
}

import { IMenu } from './menu.interface';
export interface IUserServiceFetchMenuOfRestaurantResponse {
  status: number;
  message: string;
  data: {
    results: IMenu[],
    total: number,
    size: number,
  };
}

import { IRestaurantProfile } from "./restaurant.interface";

export interface IFetchRestaurantData {
  results: IRestaurantProfile[];
  total: number;
  size: number;
}

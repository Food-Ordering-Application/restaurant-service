import { IRestaurantProfile } from "./restaurant-profile.interface";

export interface IFetchRestaurantData {
  results: IRestaurantProfile[];
  total: number;
  size: number;
}

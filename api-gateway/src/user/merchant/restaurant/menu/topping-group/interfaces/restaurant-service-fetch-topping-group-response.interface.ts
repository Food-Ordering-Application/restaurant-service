import { IFetchToppingGroupData } from '.';

export interface IRestaurantServiceFetchToppingGroupByMenuResponse {
  status: number;
  message: string;
  data: IFetchToppingGroupData;
}

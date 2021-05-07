import { IFetchMenuGroupData } from '.';

export interface IRestaurantServiceFetchMenuGroupByMenuResponse {
  status: number;
  message: string;
  data: IFetchMenuGroupData;
}

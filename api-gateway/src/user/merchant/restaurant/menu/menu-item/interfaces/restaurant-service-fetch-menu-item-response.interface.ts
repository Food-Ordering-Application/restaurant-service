import { IFetchMenuItemData } from '.';

export interface IRestaurantServiceFetchMenuItemByMenuResponse {
  status: number;
  message: string;
  data: IFetchMenuItemData;
}

import { IFetchToppingItemData } from '.';

export interface IRestaurantServiceFetchToppingItemByMenuResponse {
  status: number;
  message: string;
  data: IFetchToppingItemData;
}

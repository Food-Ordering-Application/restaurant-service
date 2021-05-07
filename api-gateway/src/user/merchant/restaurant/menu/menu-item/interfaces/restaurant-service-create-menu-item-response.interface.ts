import { IMenuItem } from './menu-item.interface';

export interface IRestaurantServiceCreateMenuItemResponse {
  status: number;
  message: string;
  data: {
    menuItem: IMenuItem;
  }
}

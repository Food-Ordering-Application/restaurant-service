import { IAddressAndMenuItemData } from './index';

export interface IGetRestaurantAddressAndMenuItemResponse {
  status: number;
  message: string;
  data: IAddressAndMenuItemData | null;
}

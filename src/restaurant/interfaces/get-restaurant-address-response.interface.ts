import { IRestaurantAddressData } from './index';

export interface IGetRestaurantAddressResponse {
  status: number;
  message: string;
  data: IRestaurantAddressData | null;
}

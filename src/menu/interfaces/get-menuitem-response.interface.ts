import { IMenuItemData } from './index';

export interface IGetMenuItemResponse {
  status: number;
  message: string;
  data: IMenuItemData | null;
}

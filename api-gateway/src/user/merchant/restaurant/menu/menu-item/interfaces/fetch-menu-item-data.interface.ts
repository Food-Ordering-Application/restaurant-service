import { IMenuItem } from './menu-item.interface';

export interface IFetchMenuItemData {
  results: IMenuItem[];
  total: number;
  size: number;
}

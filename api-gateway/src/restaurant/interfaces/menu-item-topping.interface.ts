import { IMenuItem } from './index';
import { IToppingItem } from './topping-item.interface';

export interface IMenuItemTopping {
  id: string;
  menuItem?: IMenuItem;
  toppingItem?: IToppingItem;
  customPrice?: number;
}

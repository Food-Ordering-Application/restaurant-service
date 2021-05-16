import { IMenuItem, IMenu, IToppingItem } from './index';
export interface IMenuItemTopping {
  id?: string;
  menuItem?: IMenuItem;
  toppingItem?: IToppingItem;
  menu?: IMenu;
  customPrice?: number;
}

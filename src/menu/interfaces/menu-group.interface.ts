import { IMenuItem } from './index';

export interface IMenuGroup {
  id: string;
  menuId?: string;
  name?: string;
  index?: number;
  menuItems?: IMenuItem[];
}

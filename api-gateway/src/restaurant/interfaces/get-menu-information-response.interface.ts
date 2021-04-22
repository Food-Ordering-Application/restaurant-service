import { IMenu } from './index';
import { IMenuGroup } from './menu-group.interface';

export interface IMenuInformationResponse {
  status: number;
  message: string;
  menu: IMenu | null;
  menuGroups: IMenuGroup[] | null;
  // errors: { [key: string]: any };
}

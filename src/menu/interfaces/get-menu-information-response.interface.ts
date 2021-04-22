import { IMenuGroup, IMenu } from './index';

export interface IMenuInformationResponse {
  status: number;
  message: string;
  menu: IMenu | null;
  menuGroups: IMenuGroup[] | null;
  // errors: { [key: string]: any };
}

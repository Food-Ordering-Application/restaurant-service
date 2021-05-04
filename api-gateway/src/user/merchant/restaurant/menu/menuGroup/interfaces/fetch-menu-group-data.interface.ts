import { IMenuGroup } from './menu-group.interface';

export interface IFetchMenuGroupData {
  results: IMenuGroup[];
  total: number;
  size: number;
}

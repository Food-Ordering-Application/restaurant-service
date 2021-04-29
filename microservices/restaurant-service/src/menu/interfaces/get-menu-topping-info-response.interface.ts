import { IToppingGroup } from './index';

export interface IMenuItemToppingResponse {
  status: number;
  message: string;
  toppingGroups: IToppingGroup[] | null;
  // errors: { [key: string]: any };
}

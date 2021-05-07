import { IMenuGroup } from './menu-group.interface';

export interface IRestaurantServiceCreateMenuGroupResponse {
  status: number;
  message: string;
  data: {
    menuGroup: IMenuGroup;
  }
}

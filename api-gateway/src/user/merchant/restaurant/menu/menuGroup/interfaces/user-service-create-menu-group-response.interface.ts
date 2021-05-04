import { IMenuGroup } from './menu-group.interface';

export interface IUserServiceCreateMenuGroupResponse {
  status: number;
  message: string;
  data: {
    menuGroup: IMenuGroup;
  }
}

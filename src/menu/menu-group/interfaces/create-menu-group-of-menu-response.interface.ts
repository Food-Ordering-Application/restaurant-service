import { MenuGroupDto } from './../dto/menu-group.dto';

export interface ICreateMenuGroupResponse {
  status: number;
  message: string;
  data: {
    menuGroup: MenuGroupDto;
  }
}

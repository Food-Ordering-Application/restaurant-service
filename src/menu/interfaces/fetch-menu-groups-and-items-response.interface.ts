import { MenuWithMenuGroupsAndItemsDto } from '../dto';

export interface IFetchMenuGroupsAndItemsResponse {
  status: number;
  message: string;
  data: {
    menu: MenuWithMenuGroupsAndItemsDto;
  };
}

import { MenuWithMenuGroupsAndItemsDto } from '../dto';

export interface IFetchMenuGroupsAndItemsResponse {
  status: number;
  message: string;
  data: MenuWithMenuGroupsAndItemsDto;
}

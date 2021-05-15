import { MenuItemDto } from '../dto';

export interface IFetchMenuItemOfMenuResponse {
  status: number;
  message: string;
  data: {
    results: MenuItemDto[];
    total: number;
    size: number;
  };
}

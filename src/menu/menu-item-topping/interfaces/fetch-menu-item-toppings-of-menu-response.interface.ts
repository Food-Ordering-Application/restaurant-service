import { MenuItemToppingOfMenuDto } from '../dto';

export interface IFetchMenuItemToppingsOfMenuResponse {
  status: number;
  message: string;
  data: {
    results: MenuItemToppingOfMenuDto[];
    total: number;
    size: number;
  };
}

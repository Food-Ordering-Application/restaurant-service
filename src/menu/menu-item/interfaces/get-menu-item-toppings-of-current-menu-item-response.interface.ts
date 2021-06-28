import { MenuItemToppingOfMenuItemDto } from '../dto';

export interface IGetMenuItemToppingsOfCurrentMenuItemResponse {
  status: number;
  message: string;
  data: {
    menuItemId: string;
    results: MenuItemToppingOfMenuItemDto[];
  };
}

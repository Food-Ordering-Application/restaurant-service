import { MenuItemToppingOfToppingItemDto } from '../dto';

export interface IFetchMenuItemToppingsOfCurrentToppingItemResponse {
  status: number;
  message: string;
  data: {
    toppingItemId: string;
    results: MenuItemToppingOfToppingItemDto[];
  };
}

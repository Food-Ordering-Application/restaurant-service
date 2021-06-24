import { MenuItemForOrder } from '../../dto/menu-for-order/menu-item-for-order.dto';

export interface IGetMenuItemInfosResponse {
  status: number;
  message: string;
  data: {
    menuItems: MenuItemForOrder[];
  };
}

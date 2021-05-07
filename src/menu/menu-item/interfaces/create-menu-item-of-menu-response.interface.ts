import { MenuItemDto } from '../dto/menu-item.dto';

export interface ICreateMenuItemResponse {
  status: number;
  message: string;
  data: {
    menuItem: MenuItemDto;
  }
}

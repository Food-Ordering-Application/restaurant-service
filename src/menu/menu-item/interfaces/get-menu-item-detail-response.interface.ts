import { MenuItemDto } from '../dto';

export interface IGetMenuItemDetailResponse {
  status: number;
  message: string;
  data: {
    menuItem: MenuItemDto;
  };
}

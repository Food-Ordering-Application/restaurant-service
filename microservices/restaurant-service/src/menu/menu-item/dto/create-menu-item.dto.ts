import { MenuItemDataDto } from './menu-item-data.dto';

export class CreateMenuItemDto {
  merchantId: string;
  restaurantId: string;
  menuId: string;
  data: MenuItemDataDto;
}

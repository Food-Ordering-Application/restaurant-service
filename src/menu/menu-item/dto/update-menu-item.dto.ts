import { State } from 'src/menu/enums';

export class UpdateMenuItemDto {
  merchantId: string;
  restaurantId: string;
  menuId: string;
  menuItemId: string;
  data: UpdatedMenuItemDataDto;
}

export class UpdatedMenuItemDataDto {
  menuGroupId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isActive: boolean;
  state: State;
  index: number;
}

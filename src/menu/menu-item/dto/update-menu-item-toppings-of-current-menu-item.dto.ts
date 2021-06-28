import { MenuItemToppingOfMenuItemDto } from '.';

export class UpdateMenuItemToppingsOfCurrentMenuItemDto {
  merchantId: string;
  restaurantId: string;
  menuId: string;
  menuItemId: string;
  data: UpdateMenuItemToppingsOfCurrentMenuItemDataDto;
}

export class UpdateMenuItemToppingsOfCurrentMenuItemDataDto {
  menuItemToppings: MenuItemToppingOfMenuItemDto[];
}

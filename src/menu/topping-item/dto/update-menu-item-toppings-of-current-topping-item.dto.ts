import { MenuItemToppingOfToppingItemDto } from '.';

export class UpdateMenuItemToppingsOfCurrentToppingItemDto {
  merchantId: string;
  restaurantId: string;
  menuId: string;
  toppingItemId: string;
  data: UpdateMenuItemToppingsOfCurrentToppingItemDataDto;
}

export class UpdateMenuItemToppingsOfCurrentToppingItemDataDto {
  menuItemToppings: MenuItemToppingOfToppingItemDto[];
}

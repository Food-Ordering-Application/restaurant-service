import { MenuItemTopping } from '../../entities';

export class MenuItemToppingOfMenuItemDto {
  toppingItemId: string;
  customPrice: number;
  static EntityToDto(
    menuItemTopping: MenuItemTopping,
  ): MenuItemToppingOfMenuItemDto {
    const { toppingItemId, customPrice } = menuItemTopping;
    return { toppingItemId, customPrice };
  }
}

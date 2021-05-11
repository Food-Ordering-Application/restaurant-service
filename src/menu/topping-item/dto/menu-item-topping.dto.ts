import { MenuItemTopping } from '../../entities';

export class MenuItemToppingOfToppingItemDto {
  menuItemId: string;
  customPrice: number;
  static EntityToDto(
    menuItemTopping: MenuItemTopping,
  ): MenuItemToppingOfToppingItemDto {
    const { menuItemId, customPrice } = menuItemTopping;
    return { menuItemId, customPrice };
  }
}

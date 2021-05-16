import { MenuItemTopping } from '../../entities';

export class MenuItemToppingOfMenuDto {
  id: string;
  menuId: string;
  menuItemId: string;
  toppingItemId: string;
  customPrice: number;
  static EntityToDto(
    menuItemTopping: MenuItemTopping,
  ): MenuItemToppingOfMenuDto {
    const {
      id,
      menuId,
      menuItemId,
      toppingItemId,
      customPrice,
    } = menuItemTopping;
    return { id, menuId, menuItemId, toppingItemId, customPrice };
  }
}

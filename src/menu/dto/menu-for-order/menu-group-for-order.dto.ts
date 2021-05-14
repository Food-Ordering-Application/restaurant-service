import { MenuGroup } from '../../entities/';
import { MenuItemForOrder } from './menu-item-for-order.dto';
export class MenuGroupForOrderDto {
  id: string;
  name: string;
  menuItems: MenuItemForOrder[];
  static EntityToDto(menuGroup: MenuGroup): MenuGroupForOrderDto {
    const { id, name, menuItems } = menuGroup;
    return {
      id,
      name,
      menuItems: menuItems.map(MenuItemForOrder.EntityToDto),
    };
  }
}

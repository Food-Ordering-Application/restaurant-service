import { Menu } from '../../entities';
import { MenuGroupForOrderDto } from './menu-group-for-order.dto';

export class MenuForOrderDto {
  id: string;
  restaurantId: string;
  name: string;
  menuGroups: MenuGroupForOrderDto[];
  static EntityToDto(menu: Menu): MenuForOrderDto {
    const { id, restaurantId, name, menuGroups } = menu;
    return {
      id,
      restaurantId,
      name,
      menuGroups: menuGroups.map((menuGroup) =>
        MenuGroupForOrderDto.EntityToDto(menuGroup),
      ),
    };
  }
}

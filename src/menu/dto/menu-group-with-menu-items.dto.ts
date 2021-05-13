import { MenuGroup } from './../entities/menu-group.entity';
export class MenuGroupWithMenuItemsDto {
  id: string;
  name: string;
  menuItems: {
    id: string;
    name: string;
  }[];
  static EntityToDto(menuGroup: MenuGroup): MenuGroupWithMenuItemsDto {
    const { id, name, menuItems } = menuGroup;
    return {
      id,
      name,
      menuItems: menuItems.map(({ id, name }) => ({ id, name })),
    };
  }
}

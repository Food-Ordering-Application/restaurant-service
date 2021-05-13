import { MenuGroupWithMenuItemsDto } from '.';
import { Menu } from '../entities';

export class MenuWithMenuGroupsAndItemsDto {
  menuId: string;
  menuGroups: MenuGroupWithMenuItemsDto[];
  static EntityToDto(menu: Menu): MenuWithMenuGroupsAndItemsDto {
    const { id, menuGroups } = menu;
    return {
      menuId: id,
      menuGroups: menuGroups.map((menuGroup) =>
        MenuGroupWithMenuItemsDto.EntityToDto(menuGroup),
      ),
    };
  }
}

import { MenuGroup } from '../../entities/menu-group.entity';
export class MenuGroupDto {
  id: string;
  menuId: string;
  name: string;
  isActive: boolean;
  index: number;
  static EntityToDto(menu: MenuGroup): MenuGroupDto {
    const { id, menuId, name, isActive, index } = menu;
    return { id, menuId, name, isActive, index };
  }
}

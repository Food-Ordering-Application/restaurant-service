import { MenuItem } from '../../entities/menu-item.entity';
export class MenuItemDto {
  id: string;
  menuId: string;
  menuGroupId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isActive: boolean;
  index: number;
  static EntityToDto(menu: MenuItem): MenuItemDto {
    const {
      id,
      menuId,
      menuGroupId,
      name,
      description,
      price,
      imageUrl,
      isActive,
      index,
    } = menu;
    return {
      id,
      menuId,
      menuGroupId,
      name,
      description,
      price,
      imageUrl,
      isActive,
      index,
    };
  }
}

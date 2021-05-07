import { Menu } from './../entities/menu.entity';
export class MenuDto {
  id: string;
  restaurantId: string;
  name: string;
  isActive: boolean;
  static EntityToDto(menu: Menu): MenuDto {
    const { id, restaurantId, name, isActive } = menu;
    return { id, restaurantId, name, isActive };
  }
}

import { MenuItem } from '../../entities';
export class MenuItemForOrder {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  static EntityToDto(menuGroup: MenuItem): MenuItemForOrder {
    const { id, name, description, price, imageUrl } = menuGroup;
    return {
      id,
      name,
      description,
      price,
      imageUrl,
    };
  }
}

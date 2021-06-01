import { State } from 'src/menu/enums';
import { MenuItem } from '../../entities';
export class MenuItemForOrder {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  state: State;
  static EntityToDto(menuGroup: MenuItem): MenuItemForOrder {
    const { id, name, description, price, imageUrl, state } = menuGroup;
    return {
      id,
      name,
      description,
      price,
      imageUrl,
      state,
    };
  }
}

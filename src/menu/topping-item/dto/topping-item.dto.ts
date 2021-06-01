import { State } from 'src/menu/enums';
import { ToppingItem } from '../../entities/topping-item.entity';
export class ToppingItemDto {
  id: string;
  menuId: string;
  toppingGroupId: string;
  name: string;
  description: string;
  price: number;
  maxQuantity: number;
  isActive: boolean;
  state: State;
  index: number;
  static EntityToDto(menu: ToppingItem): ToppingItemDto {
    const {
      id,
      menuId,
      toppingGroupId,
      name,
      description,
      price,
      maxQuantity,
      isActive,
      state,
      index,
    } = menu;
    return {
      id,
      menuId,
      toppingGroupId,
      name,
      description,
      price,
      maxQuantity,
      isActive,
      state,
      index,
    };
  }
}

import { ToppingGroup } from '../../entities/topping-group.entity';
export class ToppingGroupDto {
  id: string;
  menuId: string;
  name: string;
  isActive: boolean;
  index: number;
  static EntityToDto(toppingGroup: ToppingGroup): ToppingGroupDto {
    const { id, menuId, name, isActive, index } = toppingGroup;
    return { id, menuId, name, isActive, index };
  }
}

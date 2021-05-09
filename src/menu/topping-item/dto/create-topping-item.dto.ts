import { ToppingItemDataDto } from './topping-item-data.dto';

export class CreateToppingItemDto {
  merchantId: string;
  restaurantId: string;
  menuId: string;
  data: ToppingItemDataDto;
}

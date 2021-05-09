import { ToppingGroupDataDto } from './topping-group-data.dto';

export class CreateToppingGroupDto {
  merchantId: string;
  restaurantId: string;
  menuId: string;
  data: ToppingGroupDataDto;
}

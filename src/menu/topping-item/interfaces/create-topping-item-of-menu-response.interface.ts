import { ToppingItemDto } from '../dto/topping-item.dto';

export interface ICreateToppingItemResponse {
  status: number;
  message: string;
  data: {
    toppingItem: ToppingItemDto;
  };
}

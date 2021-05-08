import { IToppingItem } from './topping-item.interface';

export interface IRestaurantServiceCreateToppingItemResponse {
  status: number;
  message: string;
  data: {
    toppingItem: IToppingItem;
  }
}

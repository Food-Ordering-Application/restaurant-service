import { IOrderItemToppingData } from './index';

export interface IOrderItemData {
  menuItemId?: string;
  quantity?: number;
  orderItemToppings?: IOrderItemToppingData[];
}

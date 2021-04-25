import { IRestaurant } from '../../restaurant/interfaces';
import { IToppingItem } from './topping-item.interface';

export interface IToppingGroup {
  id: string;
  restaurant?: IRestaurant;
  toppingItems?: IToppingItem[];
  description?: string;
  price?: number;
  maxQuantity?: number;
  index?: number;
  isActive?: boolean;
}

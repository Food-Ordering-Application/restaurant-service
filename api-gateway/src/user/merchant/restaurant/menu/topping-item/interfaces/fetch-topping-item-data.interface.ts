import { IToppingItem } from './topping-item.interface';

export interface IFetchToppingItemData {
  results: IToppingItem[];
  total: number;
  size: number;
}

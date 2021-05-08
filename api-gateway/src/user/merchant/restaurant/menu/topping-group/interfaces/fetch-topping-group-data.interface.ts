import { IToppingGroup } from './topping-group.interface';

export interface IFetchToppingGroupData {
  results: IToppingGroup[];
  total: number;
  size: number;
}

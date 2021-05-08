import { IToppingGroup } from './topping-group.interface';

export interface IRestaurantServiceCreateToppingGroupResponse {
  status: number;
  message: string;
  data: {
    toppingGroup: IToppingGroup;
  }
}

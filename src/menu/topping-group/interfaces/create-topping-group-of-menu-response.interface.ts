import { ToppingGroupDto } from '../dto/topping-group.dto';

export interface ICreateToppingGroupResponse {
  status: number;
  message: string;
  data: {
    toppingGroup: ToppingGroupDto;
  }
}

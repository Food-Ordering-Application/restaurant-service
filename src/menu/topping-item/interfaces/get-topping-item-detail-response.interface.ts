import { ToppingItemDto } from '../dto';

export interface IGetToppingItemDetailResponse {
  status: number;
  message: string;
  data: {
    toppingItem: ToppingItemDto;
  };
}

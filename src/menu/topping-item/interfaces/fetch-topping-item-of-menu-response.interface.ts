import { ToppingItemDto } from '../dto';

export interface IFetchToppingItemOfMenuResponse {
  status: number;
  message: string;
  data: {
    results: ToppingItemDto[];
    total: number;
    size: number;
  };
}

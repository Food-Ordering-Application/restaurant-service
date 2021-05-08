import { ToppingGroupDto } from "../dto";

export interface IFetchToppingGroupOfMenuResponse {
  status: number;
  message: string;
  data: {
    results: ToppingGroupDto[],
    total: number,
    size: number,
  };
}

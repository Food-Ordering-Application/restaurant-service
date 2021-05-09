import { MenuGroupDto } from "../dto";

export interface IFetchMenuGroupOfMenuResponse {
  status: number;
  message: string;
  data: {
    results: MenuGroupDto[],
    total: number,
    size: number,
  };
}

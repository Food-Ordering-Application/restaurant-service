import { MenuDto } from '../dto/menu/menu.dto';
export interface IFetchMenuOfRestaurantResponse {
  status: number;
  message: string;
  data: {
    results: MenuDto[];
    total: number;
    size: number;
  };
}

import { RestaurantFilterType } from './../enums/restaurant-filter-type.enum';
import { RestaurantSortType } from './../enums/restaurant-sort-type.enum';
import { Position } from '../../geo/types/position';

export class GetSomeRestaurantDto {
  // pagination
  page: number;
  size: number;
  cityId: number;

  // search
  search?: string;

  // filter
  categoryIds?: number[];
  areaIds?: number[];

  position?: Position;
  sortId?: RestaurantSortType;
  filterIds?: RestaurantFilterType[];
}

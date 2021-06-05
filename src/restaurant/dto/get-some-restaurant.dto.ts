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
}

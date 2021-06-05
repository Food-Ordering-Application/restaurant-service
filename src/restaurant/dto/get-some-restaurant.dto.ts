export class GetSomeRestaurantDto {
  page: number;
  size: number;
  area: string;
  search?: string;
  categoryIds?: number[];
}

export class FetchToppingItemOfMenuDto {
  merchantId: string;
  restaurantId: string;
  menuId: string;
  page: number;
  size: number;
  search: string;
}

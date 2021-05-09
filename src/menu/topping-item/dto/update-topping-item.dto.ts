export class UpdateToppingItemDto {
  merchantId: string;
  restaurantId: string;
  menuId: string;
  toppingItemId: string;
  data: UpdatedToppingItemDataDto;
}

export class UpdatedToppingItemDataDto {
  toppingGroupId: string;
  name: string;
  description: string;
  price: number;
  maxQuantity: number;
  isActive: boolean;
  index: number;
}
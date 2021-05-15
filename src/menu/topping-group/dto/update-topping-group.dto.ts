export class UpdateToppingGroupDto {
  merchantId: string;
  restaurantId: string;
  menuId: string;
  toppingGroupId: string;
  data: UpdatedToppingGroupDataDto;
}

export class UpdatedToppingGroupDataDto {
  name: string;
  index: number;
  isActive: boolean;
}

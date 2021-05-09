export class UpdateMenuGroupDto {
  merchantId: string;
  restaurantId: string;
  menuId: string;
  menuGroupId: string;
  data: UpdatedMenuGroupDataDto;
}

export class UpdatedMenuGroupDataDto {
  name: string;
  index: number;
  isActive: boolean;
}
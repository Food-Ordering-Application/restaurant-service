export class UpdateMenuDto {
  merchantId: string;
  restaurantId: string;
  menuId: string;
  data: UpdatedMenuDataDto;
}

export class UpdatedMenuDataDto {
  name: string;
  isActive: boolean;
  index: number;
}

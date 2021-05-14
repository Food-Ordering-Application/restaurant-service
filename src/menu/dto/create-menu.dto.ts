export class CreateMenuDto {
  merchantId: string;
  restaurantId: string;
  data: MenuDataDto; // TODO
}

export class MenuDataDto {
  name: string;
  isActive: boolean;
  index: number;
}

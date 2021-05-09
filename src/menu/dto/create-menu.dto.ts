import { MenuDataDto } from "./menu-data.dto";

export class CreateMenuDto {
  merchantId: string;
  restaurantId: string;
  data: MenuDataDto; // TODO
}

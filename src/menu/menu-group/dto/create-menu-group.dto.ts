import { MenuGroupDataDto } from './menu-group-data.dto';

export class CreateMenuGroupDto {
  merchantId: string;
  restaurantId: string;
  menuId: string;
  data: MenuGroupDataDto;
}

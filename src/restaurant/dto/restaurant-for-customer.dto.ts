import { CategoryDto, MenuItemSearchDto } from '.';
import { Position } from '../../geo/types/position';
import { Restaurant } from '../entities';
import { DateTimeHelper } from '../helpers/datetime.helper';

export class RestaurantForCustomerDto {
  id: string;
  name: string;
  address: string;
  coverImageUrl: string;
  rating: number;
  numRate: number;
  position: Position;
  merchantIdInPayPal: string;
  categories: CategoryDto[];
  isOpening: boolean;
  menuItems?: MenuItemSearchDto[];
  static EntityToDTO(
    restaurant: Restaurant,
    menuItems: MenuItemSearchDto[] = [],
  ): RestaurantForCustomerDto {
    const {
      id,
      name,
      address,
      coverImageUrl,
      numRate,
      rating,
      categories,
      merchantIdInPayPal,
      openHours,
      geom,
    } = restaurant;
    return {
      id,
      name,
      coverImageUrl,
      numRate,
      rating,
      address,
      ...(categories && {
        categories: categories.map(CategoryDto.EntityToDto),
      }),
      merchantIdInPayPal,
      position: Position.GeometryToPosition(geom),
      isOpening:
        openHours &&
        Array.isArray(openHours) &&
        openHours &&
        DateTimeHelper.getCurrentOpenHours(openHours).some(
          DateTimeHelper.getOpenStatus,
        )
          ? true
          : false,
      menuItems,
    };
  }
}

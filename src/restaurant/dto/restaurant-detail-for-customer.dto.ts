import { OpenHourDto, CategoryDto } from '.';
import { Restaurant } from '../entities';
import { Position } from '../../geo/types/position';
import { DateTimeHelper } from '../helpers/datetime.helper';

export class RestaurantDetailForCustomerDto {
  id: string;
  name: string;
  phone: string;
  coverImageUrl: string;
  videoUrl: string;
  numRate: number;
  rating: number;
  address: string;
  city?: string;
  area?: string;
  isFavorite: boolean;
  isOpening: boolean;
  position: Position;
  openHours?: OpenHourDto[];
  categories?: CategoryDto[];
  merchantIdInPayPal: string;
  static EntityToDTO(restaurant: Restaurant): RestaurantDetailForCustomerDto {
    const {
      id,
      name,
      phone,
      coverImageUrl,
      videoUrl,
      numRate,
      rating,
      address,
      city,
      area,
      geom,
      openHours,
      categories,
      merchantIdInPayPal,
      favoriteByUsers,
    } = restaurant;
    return {
      id,
      name,
      coverImageUrl,
      videoUrl,
      numRate,
      rating,
      address,
      phone,
      position: Position.GeometryToPosition(geom),
      isFavorite:
        favoriteByUsers &&
        Array.isArray(favoriteByUsers) &&
        favoriteByUsers.length
          ? true
          : false,
      ...(city && {
        city: city.name,
      }),
      ...(area && {
        area: area.name,
      }),
      ...(openHours && {
        openHours: openHours.map(OpenHourDto.EntityToDto),
      }),
      ...(categories && {
        categories: categories.map(CategoryDto.EntityToDto),
      }),
      isOpening:
        openHours &&
        DateTimeHelper.getCurrentOpenHours(openHours).some(
          DateTimeHelper.getOpenStatus,
        )
          ? true
          : false,
      merchantIdInPayPal,
    };
  }
}

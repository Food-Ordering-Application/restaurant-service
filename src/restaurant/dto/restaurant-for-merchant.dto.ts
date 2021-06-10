import { Position } from 'src/geo/types/position';
import { CategoryDto, OpenHourDto } from '.';
import { Restaurant } from '../entities';

export class RestaurantForMerchantDto {
  id: string;
  owner: string;
  name: string;
  phone: string;
  coverImageUrl: string;
  videoUrl: string;
  verifiedImageUrl: string;
  address: string;
  position: Position;
  city?: string;
  area?: string;
  cityId: number;
  areaId: number;
  openHours?: OpenHourDto[];
  categories?: CategoryDto[];
  isActive: boolean;
  isVerified: boolean;
  isBanned: boolean;
  static EntityToDTO(restaurant: Restaurant): RestaurantForMerchantDto {
    const {
      id,
      owner,
      name,
      phone,
      coverImageUrl,
      videoUrl,
      verifiedImageUrl,
      address,
      city,
      cityId,
      area,
      areaId,
      geom,
      openHours,
      categories,
      isActive,
      isVerified,
      isBanned,
    } = restaurant;
    return {
      id,
      name,
      owner,
      coverImageUrl,
      videoUrl,
      verifiedImageUrl,
      address,
      phone,
      position: Position.GeometryToPosition(geom),
      ...(city && {
        city: city.name,
      }),
      cityId,
      ...(area && {
        area: area.name,
      }),
      areaId,
      ...(openHours && {
        openHours: openHours.map((openHour) =>
          OpenHourDto.EntityToDto(openHour),
        ),
      }),
      ...(categories && {
        categories: categories.map((category) =>
          CategoryDto.EntityToDto(category),
        ),
      }),
      isActive,
      isVerified,
      isBanned,
    };
  }
}

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
  geo: {
    latitude: number;
    longitude: number;
  };
  city?: string;
  area?: string;
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
      area,
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
      geo: {
        latitude: geom.coordinates[1],
        longitude: geom.coordinates[0],
      },
      ...(city && {
        city: city.name,
      }),
      ...(area && {
        area: area.name,
      }),
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

import { CategoryDto, OpenHourDto } from '.';
import { Restaurant } from '../entities';

export class RestaurantOfMerchantDto {
  id: string;
  owner: string;
  name: string;
  phone: string;
  coverImageUrl: string;
  address: string;
  city: string;
  area: string;
  geo: {
    latitude: number;
    longitude: number;
  };
  openHours?: OpenHourDto[];
  categories?: CategoryDto[];
  isActive: boolean;
  isVerified: boolean;
  isBanned: boolean;
  static EntityToDTO(restaurant: Restaurant): RestaurantOfMerchantDto {
    const {
      id,
      owner,
      name,
      phone,
      coverImageUrl,
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
      address,
      city,
      area,
      phone,
      geo: {
        latitude: geom.coordinates[0],
        longitude: geom.coordinates[1],
      },
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

import { CategoryDto, OpenHourDto } from '.';
import { Restaurant } from '../entities';

export class RestaurantForCustomerDto {
  id: string;
  name: string;
  phone: string;
  coverImageUrl: string;
  videoUrl: string;
  address: string;
  city: string;
  area: string;
  geo: {
    latitude: number;
    longitude: number;
  };
  openHours?: OpenHourDto[];
  categories?: CategoryDto[];
  static EntityToDTO(restaurant: Restaurant): RestaurantForCustomerDto {
    const {
      id,
      name,
      phone,
      coverImageUrl,
      videoUrl,
      address,
      city,
      area,
      geom,
      openHours,
      categories,
    } = restaurant;
    return {
      id,
      name,
      coverImageUrl,
      videoUrl,
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
    };
  }
}

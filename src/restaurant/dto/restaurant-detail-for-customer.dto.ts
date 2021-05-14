import { OpenHourDto } from '.';
import { Restaurant } from '../entities';
import { CategoryType } from '../enums';

export class RestaurantDetailForCustomerDto {
  id: string;
  name: string;
  phone: string;
  coverImageUrl: string;
  videoUrl: string;
  numRate: number;
  rating: number;
  address: string;
  city: string;
  area: string;
  geo: {
    latitude: number;
    longitude: number;
  };
  openHours?: OpenHourDto[];
  categories?: CategoryType[];
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
    } = restaurant;
    return {
      id,
      name,
      coverImageUrl,
      videoUrl,
      numRate,
      rating,
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
        categories: categories.map(({ type }) => type as CategoryType),
      }),
    };
  }
}

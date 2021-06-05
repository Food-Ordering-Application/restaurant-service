import { OpenHourDto, CategoryDto } from '.';
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
        latitude: geom.coordinates[1],
        longitude: geom.coordinates[0],
      },
      ...(openHours && {
        openHours: openHours.map(OpenHourDto.EntityToDto),
      }),
      ...(categories && {
        categories: categories.map(CategoryDto.EntityToDto),
      }),
      merchantIdInPayPal,
    };
  }
}

import { Restaurant } from "../entities";

export class RestaurantDto {
  id: string;
  name: string;
  phone: string;
  owner: string;
  coverImageUrl: string;
  videoUrl?: string;
  address: string;
  city: string;
  area: string;
  static EntityToDTO(restaurant: Restaurant): RestaurantDto {
    const { id, name, owner, coverImageUrl, videoUrl, address, city, area, phone } = restaurant;
    return { id, name, owner, coverImageUrl, videoUrl, address, city, area, phone };
  }
}

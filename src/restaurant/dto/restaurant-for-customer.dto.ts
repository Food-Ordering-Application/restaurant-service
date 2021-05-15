import { Restaurant } from '../entities';
import { CategoryType } from '../enums';

export class RestaurantForCustomerDto {
  id: string;
  name: string;
  address: string;
  coverImageUrl: string;
  numRate: number;
  rating: number;
  categories: CategoryType[];
  static EntityToDTO(restaurant: Restaurant): RestaurantForCustomerDto {
    const {
      id,
      name,
      address,
      coverImageUrl,
      numRate,
      rating,
      categories,
    } = restaurant;
    return {
      id,
      name,
      coverImageUrl,
      numRate,
      rating,
      address,
      categories: categories.map(({ type }) => type as CategoryType),
    };
  }
}

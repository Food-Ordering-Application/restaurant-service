import { CategoryDto } from '.';
import { Restaurant } from '../entities';
import { CategoryType } from '../enums';

export class RestaurantForCustomerDto {
  id: string;
  name: string;
  address: string;
  coverImageUrl: string;
  numRate: number;
  rating: number;
  merchantIdInPayPal: string;
  categories: CategoryDto[];
  static EntityToDTO(restaurant: Restaurant): RestaurantForCustomerDto {
    const {
      id,
      name,
      address,
      coverImageUrl,
      numRate,
      rating,
      categories,
      merchantIdInPayPal,
    } = restaurant;
    return {
      id,
      name,
      coverImageUrl,
      numRate,
      rating,
      address,
      categories: categories.map(CategoryDto.EntityToDto),
      merchantIdInPayPal,
    };
  }
}

import { MenuItem } from '../../menu/entities/menu-item.entity';
import { Category } from '../entities/category.entity';
import { Restaurant, OpenHour } from '../entities';
import { DateTimeHelper } from '../helpers/datetime.helper';
export class RestaurantSearchDto {
  id: string;

  areaId: number;
  cityId: number;
  categoryIds: number[];

  isActive: boolean;
  isVerified: boolean;
  isBanned: boolean;

  // favoriteUserIds: string[];
  name: string;
  menuItems: {
    id: string;
    name: string;
    price: number;
    // isActive: boolean;
    imageUrl: string;
  }[];

  location: number[];

  openHours: { gte: number; lt: number }[];

  numRate: number;
  rating: number;

  static fromEntity(restaurant: Restaurant): RestaurantSearchDto {
    const {
      id,
      name,
      numRate,
      rating,
      openHours,
      categories,
      areaId,
      cityId,
      isActive,
      isBanned,
      isVerified,
      menu,
    } = restaurant;
    const menuItemEntities = menu?.menuItems || [];
    const convertOpenHour = (openHour: OpenHour) => {
      return 1;
    };
    const convertCategory = (category: Category) => {
      return category.id;
    };

    const convertMenuItem = ({
      id,
      name,
      price,
      // isActive,
      imageUrl,
    }: MenuItem): {
      id: string;
      name: string;
      price: number;
      // isActive: boolean;
      imageUrl: string;
    } => {
      return {
        id,
        name,
        price,
        // isActive,
        imageUrl,
      };
    };

    const convertLocation = ({ geom }: Restaurant): number[] => {
      return geom?.coordinates;
    };
    return {
      id,
      name,
      areaId,
      cityId,
      isActive,
      isBanned,
      isVerified,
      numRate,
      rating,
      location: convertLocation(restaurant),
      openHours: openHours?.map(DateTimeHelper.encodeOpenHour) || [],
      categoryIds: categories?.map(convertCategory) || [],
      menuItems: menuItemEntities?.map(convertMenuItem) || [],
    };
  }
}

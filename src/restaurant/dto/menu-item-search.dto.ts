import { MenuItem } from 'src/menu/entities';

export class MenuItemSearchDto {
  id: string;
  name: string;
  price: number;
  // isActive: boolean;
  imageUrl: string;
  static convertMenuItem({
    id,
    name,
    price,
    // isActive,
    imageUrl,
  }: MenuItem): MenuItemSearchDto {
    return {
      id,
      name,
      price,
      // isActive,
      imageUrl,
    };
  }
}

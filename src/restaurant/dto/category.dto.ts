import { Category } from './../entities/';

export class CategoryDto {
  id: number;
  name: string;
  iconUrl: string;
  displayOrder: number;
  static EntityToDto(category: Category): CategoryDto {
    const { id, name, iconUrl, displayOrder } = category;
    return { id, name, iconUrl, displayOrder };
  }
}

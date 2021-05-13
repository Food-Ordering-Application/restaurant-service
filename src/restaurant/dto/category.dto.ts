import { Category } from './../entities/';
import { CategoryType } from '../enums';

export class CategoryDto {
  id: string;
  type: string;
  static EntityToDto(category: Category): CategoryDto {
    const { id, type } = category;
    return { id, type };
  }
}

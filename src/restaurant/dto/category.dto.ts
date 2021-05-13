import { Category } from './../entities/';

export class CategoryDto {
  id: string;
  type: string;
  static EntityToDto(category: Category): CategoryDto {
    const { id, type } = category;
    return { id, type };
  }
}

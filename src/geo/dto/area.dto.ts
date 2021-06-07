import { Area } from '../entities';

export class AreaDto {
  id: number;
  name: string;
  static EntityToDto(area: Area): AreaDto {
    const { id, name } = area;
    return {
      id,
      name,
    };
  }
}

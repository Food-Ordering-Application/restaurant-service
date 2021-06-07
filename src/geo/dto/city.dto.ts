import { City } from './../entities';
import { AreaDto } from './area.dto';

export class CityDto {
  id: number;
  name: string;
  districts: AreaDto[];
  static EntityToDto(city: City): CityDto {
    const { id, name, districts } = city;
    return {
      id,
      name,
      districts: districts.map(AreaDto.EntityToDto),
    };
  }
}

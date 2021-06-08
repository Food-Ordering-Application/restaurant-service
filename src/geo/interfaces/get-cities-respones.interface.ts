import { CityDto } from '../dto';

export interface IGetCitiesResponse {
  status: number;
  message: string;
  data: {
    cities: CityDto[];
  };
}

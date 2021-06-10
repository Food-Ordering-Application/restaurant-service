import { CityDto } from '../dto';

export interface IGetCityResponse {
  status: number;
  message: string;
  data: {
    city: CityDto;
  };
}

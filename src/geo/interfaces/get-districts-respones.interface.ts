import { CityDto } from '../dto';

export interface IGetDistrictsResponse {
  status: number;
  message: string;
  data: {
    city: CityDto;
  };
}

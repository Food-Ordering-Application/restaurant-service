import { MenuForOrderDto } from '../dto';

export interface IMenuInformationResponse {
  status: number;
  message: string;
  data: {
    menu: MenuForOrderDto;
  };
}

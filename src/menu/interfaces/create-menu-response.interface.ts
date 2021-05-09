import { MenuDto } from './../dto/';

export interface ICreateMenuResponse {
  status: number;
  message: string;
  data: {
    menu: MenuDto;
  }
}

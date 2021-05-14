import { MenuForOrderDto } from '../dto';
import { IMenuGroup, IMenu } from './index';

export interface IMenuInformationResponse {
  status: number;
  message: string;
  data: {
    menu: MenuForOrderDto;
  };
}

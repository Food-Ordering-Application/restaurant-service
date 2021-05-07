import { IMenu } from "./menu.interface";

export interface IRestaurantServiceCreateMenuResponse {
  status: number;
  message: string;
  data: {
    menu: IMenu;
  }
}

import { IMenu } from "./menu.interface";

export interface IFetchMenuData {
  results: IMenu[];
  total: number;
  size: number;
}

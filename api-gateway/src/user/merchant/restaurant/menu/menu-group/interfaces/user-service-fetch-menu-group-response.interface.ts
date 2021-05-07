import { IFetchMenuGroupData } from '.';

export interface IUserServiceFetchMenuGroupByMenuResponse {
  status: number;
  message: string;
  data: IFetchMenuGroupData;
}

import { IFetchStaffData } from '../interfaces';

export interface IUserServiceFetchStaffByMerchantResponse {
  status: number;
  message: string;
  data: IFetchStaffData;
}

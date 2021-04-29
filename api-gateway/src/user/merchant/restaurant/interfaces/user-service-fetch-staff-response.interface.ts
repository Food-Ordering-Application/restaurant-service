import { IFetchStaffData } from '.';

export interface IUserServiceFetchStaffByMerchantResponse {
  status: number;
  message: string;
  data: IFetchStaffData;
}

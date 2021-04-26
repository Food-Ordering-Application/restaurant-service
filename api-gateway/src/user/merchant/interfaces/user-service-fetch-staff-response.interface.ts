import { IFetchStaffData } from ".";
import { IMerchant } from "./merchant.interface";

export interface IUserServiceFetchStaffByMerchantResponse {
  status: number;
  message: string;
  data: IFetchStaffData;
}

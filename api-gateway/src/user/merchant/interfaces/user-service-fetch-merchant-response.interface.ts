import { IMerchant } from "./merchant.interface";

export interface IUserServiceFetchMerchantResponse {
  status: number;
  message: string;
  user: IMerchant | null;
  // errors: { [key: string]: any };
}

import { IMerchant } from "./merchant.interface";

export interface IUserServiceResponse {
  status: number;
  message: string;
  user: IMerchant | null;
  // errors: { [key: string]: any };
}

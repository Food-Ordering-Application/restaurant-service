import { IMerchant } from './merchant.interface';

export interface IUserServiceCreateMerchantResponse {
  status: number;
  message: string;
  user: IMerchant | null;
  // errors: { [key: string]: any };
}

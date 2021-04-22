import { IMerchant } from './merchant.interface';

export interface IUserServiceCreateResponse {
  status: number;
  message: string;
  user: IMerchant | null;
  // errors: { [key: string]: any };
}

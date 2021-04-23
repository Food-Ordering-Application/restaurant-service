import { IMerchant } from ".";

export interface ILoginMerchantData {
  user: {
    id: string;
    username: string;
  };
  access_token: string;
}

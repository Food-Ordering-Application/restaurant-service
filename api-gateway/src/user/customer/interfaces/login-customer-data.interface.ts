import { IUser } from './user.interface';

export interface ILoginCustomerData {
  user: IUser;
  access_token: string;
}

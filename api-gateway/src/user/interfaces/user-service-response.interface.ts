import { IUser } from './user.interface';

export interface IUserServiceResponse {
  status: number;
  message: string;
  user: IUser | null;
  // errors: { [key: string]: any };
}

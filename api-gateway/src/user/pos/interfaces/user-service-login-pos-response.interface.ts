import { IStaffLogin } from ".";

export interface IUserServiceLoginPosResponse {
  status: number;
  message: string;
  user: IStaffLogin;
}

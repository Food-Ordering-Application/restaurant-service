import { IAdmin } from "./admin.interface";

export interface IUserServiceResponse {
  status: number;
  message: string;
  user: IAdmin | null;
  // errors: { [key: string]: any };
}

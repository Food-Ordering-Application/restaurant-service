import { IAdmin } from "./admin.interface";

export interface IUserServiceFetchAdminResponse {
  status: number;
  message: string;
  user: IAdmin | null;
  // errors: { [key: string]: any };
}

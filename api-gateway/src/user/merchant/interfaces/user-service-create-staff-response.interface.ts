import { IStaff } from './Staff.interface';

export interface IUserServiceCreateStaffResponse {
  status: number;
  message: string;
  data: {
    staff: IStaff;
  }
}

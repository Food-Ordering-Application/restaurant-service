import { IStaff } from './staff.interface';

export interface IUserServiceCreateStaffResponse {
  status: number;
  message: string;
  data: {
    staff: IStaff;
  }
}

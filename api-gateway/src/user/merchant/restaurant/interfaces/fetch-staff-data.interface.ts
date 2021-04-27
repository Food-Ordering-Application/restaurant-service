import { IStaff } from './staff.interface';

export interface IFetchStaffData {
  results: IStaff[];
  total: number;
  size: number;
}

import { IVerifyAppKeyResponseData } from './verify-app-key-response-data';

export interface IUserServiceVerifyAppKeyResponse {
  status: number;
  message: string;
  data: IVerifyAppKeyResponseData;
}
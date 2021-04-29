import { MerchantJwtPayload } from './merchant-jwt-payload.interface';
export interface MerchantJwtRequest extends Request {
  user: MerchantJwtPayload;
}
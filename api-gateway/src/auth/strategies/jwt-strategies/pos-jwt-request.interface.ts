import { PosJwtPayload } from './pos-jwt-payload.interface';
export interface PosJwtRequest extends Request {
  user: PosJwtPayload;
}
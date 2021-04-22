import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MerchantLocalAuthGuard extends AuthGuard('merchant-local') { }

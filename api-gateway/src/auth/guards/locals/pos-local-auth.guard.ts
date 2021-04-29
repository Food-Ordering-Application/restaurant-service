import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class PosLocalAuthGuard extends AuthGuard('pos-local') { }

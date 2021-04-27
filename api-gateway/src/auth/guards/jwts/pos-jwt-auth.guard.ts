import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class PosJwtAuthGuard extends AuthGuard('pos-jwt') { }

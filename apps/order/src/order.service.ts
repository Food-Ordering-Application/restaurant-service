import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  public accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => Number(a) + Number(b));
  }
}

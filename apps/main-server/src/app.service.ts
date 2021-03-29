import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('ORDER_SERVICE') private client: ClientProxy) {}

  public accumulate(data: number[]) {
    return this.client.send<number, number[]>({ cmd: 'sum' }, data);
  }
}

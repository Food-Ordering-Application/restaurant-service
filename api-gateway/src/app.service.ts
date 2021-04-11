import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import * as constants from './constants';

@Injectable()
export class AppService {
  // constructor(@Inject(constants.USER_SERVICE) private client: ClientProxy) {}

  getHello(): string {
    return 'Hi there';
    // return this.client.send<string>({ cmd: 'Hello' }, { name: 'hien' });
  }
}

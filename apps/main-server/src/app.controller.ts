import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private logger = new Logger('App Controller');

  constructor(private readonly appService: AppService) {}

  @Post('add')
  async accumulate(@Body('data') data: number[]) {
    this.logger.log('Adding ' + data.toString());
    return this.appService.accumulate(data);
  }
}

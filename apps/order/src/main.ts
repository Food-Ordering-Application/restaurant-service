import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3500,
      },
    },
  );
  app.listen(() => console.log('Order service is listening...'));
}
bootstrap();

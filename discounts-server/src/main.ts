import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://mrzphpip:wn0yCqUxfTkUY6GCX05XgREO4tnS82gP@cow.rmq2.cloudamqp.com/mrzphpip'],
        queue: 'discounts_queue',
        queueOptions: {
          durable: false
        },
      },
    },
  );
  app.listen();
}
bootstrap();

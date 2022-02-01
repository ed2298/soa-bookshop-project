import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationMiddleware } from 'src/common/authentication.middleware';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BOOKSHOP_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://mrzphpip:wn0yCqUxfTkUY6GCX05XgREO4tnS82gP@cow.rmq2.cloudamqp.com/mrzphpip',
          ],
          queue: 'bookshop_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'DISCOUNTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://mrzphpip:wn0yCqUxfTkUY6GCX05XgREO4tnS82gP@cow.rmq2.cloudamqp.com/mrzphpip',
          ],
          queue: 'discounts_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(AuthenticationMiddleware).forRoutes(
      { method: RequestMethod.POST, path: '/book' },
      { method: RequestMethod.PUT, path: '/book/:bookID' },
      { method: RequestMethod.DELETE, path: '/book/:bookID' },
      { method: RequestMethod.PUT, path: '/updatePrice/:bookID' },
      { method: RequestMethod.GET, path: '/myBooks/:user' },
      { method: RequestMethod.GET, path: '/discounts' }
    );
  }
}

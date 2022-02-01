import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookshopModule } from './bookshop/bookshop.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo-db:27018', { dbName: 'nest-bookshop-project', useNewUrlParser: true }),
    // MongooseModule.forRoot('mongodb://localhost', { dbName: 'nest-bookshop-project', useNewUrlParser: true }),
    BookshopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

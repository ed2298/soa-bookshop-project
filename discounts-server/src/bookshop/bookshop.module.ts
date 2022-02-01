import { Module } from '@nestjs/common';
import { BookshopService } from './bookshop.service';
import { BookshopController } from './bookshop.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookshopSchema } from './schemas/bookshop.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Book', schema: BookshopSchema }]),
    ],
  providers: [BookshopService],
  controllers: [BookshopController]
})
export class BookshopModule {}
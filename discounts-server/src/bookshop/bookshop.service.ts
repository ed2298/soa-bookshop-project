import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './interfaces/book.interface';

@Injectable()
export class BookshopService {
  
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) { }
  
  async updatePrice(book: any, price: string): Promise<Book> {
    book.old_price = book.price;
    const discountToFloat = parseFloat(price.slice(1));
    const newPriceToFloat = parseFloat(book.price.slice(1)) - discountToFloat;
    const newPrice = newPriceToFloat > 0 ? "$" + newPriceToFloat.toString() : "$0";
    book.price = newPrice;
    const editedBook = await this.bookModel.findByIdAndUpdate(book._id, book);
    return editedBook;
  }

  async get_discounts(): Promise<Book[]> {
    return await this.bookModel.find({ $or: [ { $expr: { $lt: [ "$price", "$old_price" ] } }, { price: { $eq: "$0" } } ] } );
  }

  async get_my_books(user_email: string): Promise<Book[]> {
    return await this.bookModel.find({ user_email: { $eq: user_email } } )
  }
} 
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './interfaces/book.interface';
import { CreateBookDTO } from './dto/create-book.dto';

@Injectable()
export class BookshopService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) { }
  
  async getBooks(): Promise<Book[]> {
    const books = await this.bookModel.find().exec();
    return books;
  }

  async getBook(bookID): Promise<Book> {
    const book = await this.bookModel.findById(bookID).exec();
    return book;
  }

  async addBook(createBookDTO: CreateBookDTO): Promise<Book> {
    const newBook = await new this.bookModel(createBookDTO);
    return newBook.save();
  }
  
  async editBook(bookID, createBookDTO: CreateBookDTO): Promise<Book> {
    const editedBook = await this.bookModel.findByIdAndUpdate(bookID, createBookDTO, { new: true });
    return editedBook;
  }

  async deleteBook(bookID): Promise<any> {
    const deletedBook = await this.bookModel.findByIdAndRemove(bookID);
    return deletedBook;
  }
} 
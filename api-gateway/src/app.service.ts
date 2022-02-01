import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateBookDTO } from './create-book.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('BOOKSHOP_SERVICE') private readonly bookshopService: ClientProxy,
    @Inject('DISCOUNTS_SERVICE') private readonly discountsService: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createBook(createBookDTO: CreateBookDTO) {
    const book = await firstValueFrom(this.bookshopService.send({ cmd: 'book_created' }, createBookDTO));
    console.log(book);
    return book;
  }

  async getBooks() {
    return this.bookshopService.send({ cmd: 'get_books' }, {});
  }

  async getBook(bookID: any) {
    const book = await firstValueFrom(this.bookshopService.send({ cmd: 'get_book' }, bookID));
    return book;
  }

  async editBook(bookID: string, createBookDTO: CreateBookDTO) {
    const book = await firstValueFrom(this.bookshopService.send({ cmd: 'edit_book' }, { bookID, createBookDTO }));
    return book;
  }

  async deleteBook(bookID: string) {
    const deletedBook = await firstValueFrom(this.bookshopService.send({ cmd: 'delete_book' }, bookID));
    return deletedBook;
  }

  async updatePrice(book: any, price: any) {
    return await firstValueFrom(this.discountsService.send({ cmd: 'update_price' }, { book, price }));
  }

  async getDiscounts(){
    return await firstValueFrom(this.discountsService.send({ cmd: 'get_discounts' }, {}));
  }

  async getMyBooks(user_email: any){
    return await firstValueFrom(this.discountsService.send({ cmd: 'get_my_books' }, { user_email }));
  }
}

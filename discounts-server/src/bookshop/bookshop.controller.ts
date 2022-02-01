
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BookshopService } from './bookshop.service';

@Controller('bookshop')
export class BookshopController {

  constructor(private bookshopService: BookshopService) { }

  @MessagePattern({cmd: 'update_price'})
  async updatePrice(data: any) {
    let book = data['book'];
    const price = data['price'];
    book = await this.bookshopService.updatePrice(book, price);
    return book;
  }

  @MessagePattern({cmd: 'get_discounts'})
  async get_discounts() {
    const discounts = await this.bookshopService.get_discounts();
    return discounts;
  }

  @MessagePattern({cmd: 'get_my_books'})
  async get_my_books(data: any) {
    const user_email = data['user_email'];
    const my_books = await this.bookshopService.get_my_books(user_email);
    return my_books;
  }

}
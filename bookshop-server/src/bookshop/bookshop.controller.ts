
import { Controller, NotFoundException } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BookshopService } from './bookshop.service';
import { CreateBookDTO } from './dto/create-book.dto';
import { Book } from './interfaces/book.interface';


@Controller('bookshop')
export class BookshopController {

  constructor(private bookshopService: BookshopService) {}

  @MessagePattern({ cmd: 'get_books' })
  async getBooks() {
    console.log("Bookshop Controller: get all books");
    return await this.bookshopService.getBooks();
  }

  @MessagePattern({ cmd: 'get_book' })
  async getPost(bookID): Promise<Book> {
    console.log("Bookshop Controller: get book with id=" + bookID);
    const book = await this.bookshopService.getBook(bookID);
    if (!book) {
      throw new NotFoundException('Book does not exist!');
    }
    return book;
  }

  @MessagePattern({ cmd: 'book_created' })
  async addBook(createBookEvent: CreateBookDTO) {
    const addedBook = await this.bookshopService.addBook(createBookEvent);
    console.log("Bookshop Controller: created book = " + addedBook);
    return addedBook;
  }

  @MessagePattern({ cmd: 'edit_book' })
  async editBook(data) {
    console.log("Bookshop Controller: edit book with id=" + data.bookID);
    const editedBook = await this.bookshopService.editBook(data.bookID, data.createBookDTO);
    return editedBook;
  }

  @MessagePattern({ cmd: 'delete_book' })
  async deleteBook(bookID: any) {
    console.log("Bookshop Controller: delete book with id=" + bookID);
    const deletedBook = await this.bookshopService.deleteBook(bookID);
    if (!deletedBook) {
      throw new NotFoundException('Book does not exist!');
    }
    return deletedBook;
  }
}
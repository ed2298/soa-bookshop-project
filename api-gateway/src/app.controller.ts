import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { AppService } from './app.service';
import { CreateBookDTO } from './create-book.dto';
import { ValidateObjectId } from './pipes/validate-object-id.pipes';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly appGateway: AppGateway,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/book')
  async createBook(@Body() createBookDTO: CreateBookDTO, @Res() res: any) {
    const book = await this.appService.createBook(createBookDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Book has been added successfully!',
      book: book,
    });
  }

  @Get('/books')
  async getBooks() {
    return this.appService.getBooks();
  }

  @Get('/book/:bookID')
  async getBook(@Res() res, @Param('bookID', new ValidateObjectId()) bookID) {
    const book = await this.appService.getBook(bookID);
    return res.status(HttpStatus.OK).json(book);
  }

  @Put('/book/:bookID')
  async editBook(@Res() res, @Param('bookID', new ValidateObjectId()) bookID, @Body() createBookDTO: CreateBookDTO) {
    await this.appService.editBook(bookID, createBookDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Book succesfully updated',
    });
  }

  @Delete('/book/:bookID')
  async deleteBook(@Res() res, @Param('bookID', new ValidateObjectId()) bookID) {
    console.log(bookID);
    const deletedBook = await this.appService.deleteBook(bookID);
    return res.status(HttpStatus.OK).json({
      message: 'Book has been deleted!',
      book: deletedBook,
    });
  }

  @Put('/updatePrice/:bookID')
  async updatePrice(@Res() res, @Param('bookID', new ValidateObjectId()) bookID, @Body() body: string) {
    const book = await this.appService.getBook(bookID);
    const updatedBook = await this.appService.updatePrice(book, body['price']);
    console.log("updatedBook");
    console.log(updatedBook);
    this.appGateway.server.emit('update_book_price', updatedBook);
    return res.status(HttpStatus.OK).json({
      message: 'Price has been updated!',
      old_book: updatedBook,
    });
  }

  @Get('/discounts')
  async getDiscounts() {
    return this.appService.getDiscounts();
  }

  @Get('/myBooks/:user')
  async getMyBooks(@Param('user') user) {
    return this.appService.getMyBooks(user);
  }
}

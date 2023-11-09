import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  BookPresenter,
  PlainBookPresenter,
} from 'library-api/src/controllers/books/book.presenter';
import { BookId } from 'library-api/src/entities';
import { BookUseCases } from 'library-api/src/useCases';
import { CreateBookDto } from './book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookUseCases: BookUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainBookPresenter[]> {
    const books = await this.bookUseCases.getAllPlain();

    return books.map(PlainBookPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: BookId): Promise<BookPresenter> {
    const book = await this.bookUseCases.getById(id);

    return BookPresenter.from(book);
  }

  @Post('/new')
  public async createBook(
    @Body() bookCreationRequest: CreateBookDto,
  ): Promise<BookPresenter> {
    const createdBook = await this.bookUseCases.createBook(bookCreationRequest);

    return BookPresenter.from(createdBook);
  }

  @Post('/:id/delete')
  public async deleteBook(@Param('id') id: BookId): Promise<void> {
    await this.bookUseCases.deleteBook(id);
  }

  @Post('/:id/comments/new')
  public async addComment(
    @Param('id') id: BookId,
    @Body() comment: string,
  ): Promise<BookPresenter> {
    const book = await this.bookUseCases.addComment(id, comment);

    return BookPresenter.from(book);
  }

  @Post('/:id/comments/')
  public async getComments(@Param('id') id: BookId): Promise<BookPresenter> {
    const book = await this.bookUseCases.getComments(id);

    return BookPresenter.from(book);
  }
}

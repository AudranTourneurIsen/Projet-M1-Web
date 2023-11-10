import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  BookPresenter,
  PlainBookPresenter,
} from 'library-api/src/controllers/books/book.presenter';
import { BookId } from 'library-api/src/entities';
import { BookUseCases } from 'library-api/src/useCases';
import { ApiOkResponse } from '@nestjs/swagger';
import { CreateBookDto, CreateCommentDto } from './book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookUseCases: BookUseCases) {}

  @ApiOkResponse({
    description: 'Get all books',
    type: PlainBookPresenter,
    isArray: true,
  })
  @Get('/')
  public async getAll(): Promise<PlainBookPresenter[]> {
    const books = await this.bookUseCases.getAllPlain();

    return books.map(PlainBookPresenter.from);
  }

  @ApiOkResponse({
    description: 'Get book by id',
    type: BookPresenter,
    isArray: true,
  })
  @Get('/:id')
  public async getById(@Param('id') id: BookId): Promise<BookPresenter> {
    const book = await this.bookUseCases.getById(id);

    return BookPresenter.from(book);
  }

  @ApiOkResponse({
    description: 'Create a new book',
    isArray: true,
  })
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
    @Body() comment: CreateCommentDto,
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

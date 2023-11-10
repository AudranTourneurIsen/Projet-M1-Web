import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import {
  BookPresenter,
  PlainBookPresenter,
} from 'library-api/src/controllers/books/book.presenter';
import { BookId } from 'library-api/src/entities';
import { BookUseCases } from 'library-api/src/useCases';
import { ApiOkResponse } from '@nestjs/swagger';
import { CreateBookDto, CreateCommentDto } from './book.dto';
import { PlainCommentPresenter } from '../comments/comment.presenter';

@Controller('books')
export class BookController {
  constructor(private readonly bookUseCases: BookUseCases) {}

  @ApiOkResponse({
    description: 'Get all authors',
    type: PlainBookPresenter,
    isArray: true,
  })
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

  @Delete('/:id/delete')
  public async deleteBook(@Param('id') id: BookId): Promise<void> {
    await this.bookUseCases.deleteBook(id);
  }

  @Post('/:id/comments/new')
  public async addComment(
    @Param('id') id: BookId,
    @Body() comment: CreateCommentDto,
  ): Promise<PlainCommentPresenter> {
    const outputComment = await this.bookUseCases.addComment(id, comment);

    return PlainCommentPresenter.from(outputComment);
  }

  @Post('/:id/comments/')
  public async getComments(@Param('id') id: BookId): Promise<BookPresenter> {
    const book = await this.bookUseCases.getComments(id);

    return BookPresenter.from(book);
  }
}

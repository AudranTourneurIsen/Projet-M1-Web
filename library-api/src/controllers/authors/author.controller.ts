import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthorId } from 'library-api/src/entities';
import { AuthorUseCases } from 'library-api/src/useCases';
import { AuthorModel } from 'library-api/src/models';
import { AuthorPresenter, PlainAuthorPresenter } from './author.presenter';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorUseCases: AuthorUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainAuthorPresenter[]> {
    const authors = await this.authorUseCases.getAllPlain();

    return authors.map(PlainAuthorPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: AuthorId): Promise<AuthorPresenter> {
    const author = await this.authorUseCases.getById(id);

    return AuthorPresenter.from(author);
  }

  @Post('/new')
  public async create(@Body() author: AuthorModel): Promise<AuthorPresenter> {
    const createdAuthor = await this.authorUseCases.create(author);

    return AuthorPresenter.from(createdAuthor);
  }
}

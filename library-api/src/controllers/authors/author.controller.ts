import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthorId } from 'library-api/src/entities';
import { AuthorUseCases } from 'library-api/src/useCases';
import { AuthorPresenter, PlainAuthorPresenter } from './author.presenter';
import { CreateAuthorDto } from './author.dto';

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
  public async createAuthor(
    @Body() author: CreateAuthorDto,
  ): Promise<AuthorPresenter> {
    const createdAuthor = await this.authorUseCases.createAuthor(author);

    return AuthorPresenter.from(createdAuthor);
  }
}

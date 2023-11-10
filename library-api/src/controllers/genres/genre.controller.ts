import { Controller, Get, Param } from '@nestjs/common';
import { GenreUseCases } from 'library-api/src/useCases';
import { GenreId } from 'library-api/src/entities';
import { GenrePresenter, PlainGenrePresenter } from './genre.presenter';
import { ApiOkResponse } from '@nestjs/swagger';
import { PlainBookPresenter } from '../books/book.presenter';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreUseCases: GenreUseCases) {}

  @ApiOkResponse({
    description: 'Get all genres',
    type: PlainGenrePresenter,
    isArray: true,
  })
  @Get('/')
  public async getAll(): Promise<PlainGenrePresenter[]> {
    const genres = await this.genreUseCases.getAllPlain();

    return genres.map(PlainGenrePresenter.from);
  }

  @ApiOkResponse({
    description: 'Get all genres',
    type: GenrePresenter,
    isArray: true,
  })
  @Get('/:id')
  public async getById(@Param('id') id: GenreId): Promise<GenrePresenter> {
    const genre = await this.genreUseCases.getById(id);

    return GenrePresenter.from(genre);
  }
}

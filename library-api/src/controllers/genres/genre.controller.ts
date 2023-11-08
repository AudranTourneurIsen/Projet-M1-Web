import { Controller, Get, Param } from '@nestjs/common';
import { GenreUseCases } from 'library-api/src/useCases';
import { GenreId } from 'library-api/src/entities';
import { GenrePresenter, PlainGenrePresenter } from './genre.presenter';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreUseCases: GenreUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainGenrePresenter[]> {
    const genres = await this.genreUseCases.getAllPlain();

    return genres.map(PlainGenrePresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: GenreId): Promise<GenrePresenter> {
    const genre = await this.genreUseCases.getById(id);

    return GenrePresenter.from(genre);
  }
}

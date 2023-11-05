import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GenreUseCases } from 'library-api/src/useCases';
import { GenreId } from 'library-api/src/entities';
import { GenrePresenter, PlainGenrePresenter } from './genre.presenter';
import { CreateGenreDto } from './genre.dto';

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

  @Post('/new')
  public async createGenre(
    @Body() genre: CreateGenreDto,
  ): Promise<GenrePresenter> {
    const createdGenre = await this.genreUseCases.createGenre(genre);

    return GenrePresenter.from(createdGenre);
  }
}

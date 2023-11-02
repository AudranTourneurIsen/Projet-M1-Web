import { Injectable } from '@nestjs/common';
import { Genre, GenreId } from 'library-api/src/entities';
import { NotFoundError } from 'rxjs';
import { DataSource, In, Repository } from 'typeorm';
import {
  PlainGenreRepositoryOutput,
  GenreRepositoryOutput,
  CreateGenreRepositoryInput,
} from './genre.repository.type';
import {
  adaptGenreEntityToPlainGenreModel,
  adaptGenreEntityToGenreModel,
} from './genre.utils';

@Injectable()
export class GenreRepository extends Repository<Genre> {
  constructor(public readonly dataSource: DataSource) {
    super(Genre, dataSource.createEntityManager());
  }

  /**
   * Get all plain genres
   * @returns Array of plain genres
   */
  public async getAllPlain(): Promise<PlainGenreRepositoryOutput[]> {
    const genres = await this.find();

    return genres.map(adaptGenreEntityToPlainGenreModel);
  }

  /**
   * Get a genre by its ID
   * @param id Genre's ID
   * @returns Genre if found
   * @throws 404: genre with this ID was not found
   */
  public async getById(id: GenreId): Promise<GenreRepositoryOutput> {
    const genre = await this.findOne({ where: { id } });

    if (!genre) {
      throw new NotFoundError(`Genre - '${id}'`);
    }

    return adaptGenreEntityToGenreModel(genre);
  }

  /**
   * Get multiples genre by their IDs
   * @param ids Genres' IDs
   * @returns Genres if found
   * @throws 404: genre with this ID was not found
   */

  public async getByIds(ids: GenreId[]): Promise<GenreRepositoryOutput[]> {
    const genres = await this.findBy({ id: In(ids) });

    if (!genres) {
      throw new NotFoundError(`Genre - '${ids}'`);
    }

    return genres.map(adaptGenreEntityToGenreModel);
  }

  /**
   * Create a new genre
   * @param genre Genre to create
   * @returns Created genre
   */
  public async createGenre(
    genre: CreateGenreRepositoryInput,
  ): Promise<GenreRepositoryOutput> {
    const createdGenre = await this.save(genre);

    return adaptGenreEntityToGenreModel(createdGenre);
  }
}

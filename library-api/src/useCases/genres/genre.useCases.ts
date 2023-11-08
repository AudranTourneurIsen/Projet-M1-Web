import { Injectable } from '@nestjs/common';
import { GenreRepository } from 'library-api/src/repositories';
import { PlainGenreRepositoryOutput } from 'library-api/src/repositories/genres/genre.repository.type';
import { GenreId } from 'library-api/src/entities';
import { GenreUseCasesOutput } from './genre.useCases.type';

@Injectable()
export class GenreUseCases {
  constructor(private readonly genreRepository: GenreRepository) {}

  /**
   * Get all plain genres
   * @returns Array of plain genres
   */
  public async getAllPlain(): Promise<PlainGenreRepositoryOutput[]> {
    return this.genreRepository.getAllPlain();
  }

  /**
   * Get a genre by its ID
   * @param id Genre's ID
   * @returns Genre if found
   * @throws 404: genre with this ID was not found
   */
  public async getById(id: GenreId): Promise<GenreUseCasesOutput> {
    return this.genreRepository.getById(id);
  }

  /**
   * Get multiples genre by their IDs
   * @param ids Genres' IDs
   * @returns Genres if found
   * @throws 404: genre with this ID was not found
   */
  public async getByIds(ids: GenreId[]): Promise<GenreUseCasesOutput[]> {
    return this.genreRepository.getByIds(ids);
  }
}

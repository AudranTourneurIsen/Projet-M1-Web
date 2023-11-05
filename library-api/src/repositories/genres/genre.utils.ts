import { Genre } from 'library-api/src/entities';
import {
  GenreRepositoryOutput,
  PlainGenreRepositoryOutput,
} from 'library-api/src/repositories/genres/genre.repository.type';

export const adaptGenreEntityToPlainGenreModel = (
  genre: Genre,
): PlainGenreRepositoryOutput => ({
  ...genre,
});

export const adaptGenreEntityToGenreModel = (
  genre: Genre,
): GenreRepositoryOutput => ({
  ...genre,
});

import {
  GenreModel,
  PlainGenreModel,
} from 'library-api/src/models/genre.model';

export type PlainGenreRepositoryOutput = PlainGenreModel;
export type GenreRepositoryOutput = GenreModel;
export type CreateGenreRepositoryInput = Omit<GenreModel, 'id'>;

import { GenreId } from 'library-api/src/entities';

export type GenreModel = {
  id: GenreId;
  name: string;
};

export type PlainGenreModel = {
  id: GenreId;
  name: string;
};

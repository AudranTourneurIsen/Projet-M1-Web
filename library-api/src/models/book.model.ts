import { BookId } from 'library-api/src/entities';
import type {
  AuthorModel,
  PlainAuthorModel,
} from 'library-api/src/models/author.model';
import {
  GenreModel,
  PlainGenreModel,
} from 'library-api/src/models/genre.model';

export type PlainBookModel = {
  id: BookId;
  name: string;
  writtenOn: Date;
  author: PlainAuthorModel;
  genres: PlainGenreModel[];
};

export type BookModel = {
  id: BookId;
  name: string;
  writtenOn: Date;
  author: AuthorModel;
  genres: GenreModel[];
};

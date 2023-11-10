import type { UserId } from 'library-api/src/entities';
import type { BookModel, PlainBookModel } from './book.model';
import type { GenreModel, PlainGenreModel } from './genre.model';

export type PlainUserModel = {
  id: UserId;
  firstName: string;
  lastName: string;
  ownedBooks?: PlainBookModel[];
  favoriteBook?: PlainBookModel;
  favoriteGenres?: PlainGenreModel[];
  friends?: PlainUserModel[];
};

export type UserModel = {
  id: UserId;
  firstName: string;
  lastName: string;
  ownedBooks?: BookModel[];
  favoriteBook?: BookModel;
  favoriteGenres?: GenreModel[];
  friends?: UserModel[];
};

import { PlainBookModel } from '@/models/book.model';
import { PlainGenreModel } from '@/models/genre.model';

export type PlainUserModel = {
  id: string;
  firstName: string;
  lastName: string;
  ownedBooks?: PlainBookModel[];
  favoriteBook?: PlainBookModel;
  favoriteGenres?: PlainGenreModel[];
  friends?: PlainUserModel[];
};

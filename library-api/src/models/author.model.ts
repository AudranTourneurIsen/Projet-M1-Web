import { AuthorId } from 'library-api/src/entities';
// eslint-disable-next-line import/no-cycle
import { ImageModel, PlainImageModel } from './image.model';
// eslint-disable-next-line import/no-cycle
import { PlainBookModel, BookModel } from './book.model';

export type PlainAuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  books?: PlainBookModel[];
  photo?: PlainImageModel;
};

export type AuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  books?: BookModel[];
  photo?: ImageModel;
};

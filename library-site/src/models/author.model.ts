import type { PlainBookModel } from '.';
import type { PlainImageModel } from './image.model';

export type PlainAuthorModel = {
  id: string;
  firstName: string;
  lastName: string;
  books?: PlainBookModel[];
  photo?: PlainImageModel;
};

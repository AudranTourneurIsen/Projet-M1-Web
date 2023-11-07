import { AuthorId } from 'library-api/src/entities';
// eslint-disable-next-line import/no-cycle
import { ImageModel } from './image.model';

export type PlainAuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
};

export type AuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  image?: ImageModel;
};

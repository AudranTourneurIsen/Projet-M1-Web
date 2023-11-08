import { Author, ImageId } from 'library-api/src/entities';
// eslint-disable-next-line import/no-cycle
import { PlainAuthorModel } from './author.model';

export type PlainImageModel = {
  id: ImageId;
  image: string;
  author?: PlainAuthorModel;
};

export type ImageModel = {
  id: ImageId;
  image: string;
  author?: Author;
};

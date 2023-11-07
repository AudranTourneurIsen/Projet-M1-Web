import { Author, ImageId } from 'library-api/src/entities';
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

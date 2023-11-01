import { PlainAuthorModel } from './author.model';
import { PlainGenreModel } from './genre.model';

export type PlainBookModel = {
  id: string;
  name: string;
  writtenOn: Date;
  author: PlainAuthorModel;
  genres: PlainGenreModel[];
};

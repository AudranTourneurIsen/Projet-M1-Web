import { PlainUserModel } from '@/models/user.model';
import { PlainAuthorModel } from './author.model';
import { PlainGenreModel } from './genre.model';
import type { PlainCommentModel } from '../../../library-api/src/models';

export type PlainBookModel = {
  id: string;
  name: string;
  writtenOn: Date;
  author: PlainAuthorModel;
  genres: PlainGenreModel[];
  comments: PlainCommentModel[];
  ownedByUsers: PlainUserModel[];
};

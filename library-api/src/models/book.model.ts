import { BookId } from 'library-api/src/entities';
import type {
  AuthorModel,
  PlainAuthorModel,
} from 'library-api/src/models/author.model';
import {
  GenreModel,
  PlainGenreModel,
} from 'library-api/src/models/genre.model';
import type { CommentModel, PlainCommentModel } from './comment.model';
import { UserModel } from "./user.model";

export type PlainBookModel = {
  id: BookId;
  name: string;
  writtenOn: Date;
  author: PlainAuthorModel;
  genres: PlainGenreModel[];
  comments?: PlainCommentModel[];
  ownedByUsers: UserModel[],
};

export type BookModel = {
  id: BookId;
  name: string;
  writtenOn: Date;
  author: AuthorModel;
  genres: GenreModel[];
  comments?: CommentModel[];
  ownedByUsers: UserModel[],
};

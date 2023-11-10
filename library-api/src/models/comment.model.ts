import { CommentId } from 'library-api/src/entities';
import { PlainUserModel, UserModel } from './user.model';
import { BookModel, PlainBookModel } from './book.model';

export type CommentModel = {
  id: CommentId;
  writtenOn: Date;
  text: string;
  user: UserModel;
  book?: BookModel;
};

export type PlainCommentModel = {
  id: CommentId;
  writtenOn: Date;
  text: string;
  user: PlainUserModel;
  book?: PlainBookModel;
};

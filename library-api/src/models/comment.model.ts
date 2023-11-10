import { CommentId } from 'library-api/src/entities';
import { PlainUserModel, UserModel } from './user.model';

export type CommentModel = {
  id: CommentId;
  writtenOn: Date;
  text: string;
  user: UserModel;
};

export type PlainCommentModel = {
  id: CommentId;
  writtenOn: Date;
  text: string;
  user: PlainUserModel;
};

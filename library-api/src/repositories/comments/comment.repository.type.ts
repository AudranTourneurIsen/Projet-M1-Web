import { PlainCommentModel } from 'library-api/src/models';

export type CreateCommentRepositoryInput = Omit<PlainCommentModel, 'id'>;
export type CommentRepositoryOutput = PlainCommentModel;

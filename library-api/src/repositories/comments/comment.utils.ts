import { Comment } from 'library-api/src/entities';
import { CommentRepositoryOutput } from './comment.repository.type';

export const adaptCommentEntityToCommentModel = (
  comment: Comment,
): CommentRepositoryOutput => ({
  ...comment,
});

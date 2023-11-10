import { AuthorId, UserId } from 'library-api/src/entities';
import { BookModel, PlainBookModel } from 'library-api/src/models';
import { CreateBookRepositoryInput } from 'library-api/src/repositories/books/book.repository.type';
import {
  CommentRepositoryOutput,
  CreateCommentRepositoryInput,
} from 'library-api/src/repositories/comments/comment.repository.type';

export type PlainBookUseCasesOutput = PlainBookModel;
export type BookUseCasesOutput = BookModel;
export type CreateBookUseCasesInput = Omit<
  CreateBookRepositoryInput,
  'author'
> & {
  authorId: AuthorId;
};

export type CreateCommentUseCasesInput = Omit<
  CreateCommentRepositoryInput,
  'user'
> & { userId: UserId };
export type CreateCommentUseCasesOutput = CommentRepositoryOutput;

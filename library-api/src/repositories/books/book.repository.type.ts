import { PlainCommentModel } from 'library-api/src/models';
import { BookModel, PlainBookModel } from 'library-api/src/models/book.model';

export type PlainBookRepositoryOutput = PlainBookModel;
export type BookRepositoryOutput = BookModel;
export type CreateBookRepositoryInput = Omit<PlainBookModel, 'id'>;

export type CreateCommentRepositoryInput = Omit<PlainCommentModel, 'id'>;

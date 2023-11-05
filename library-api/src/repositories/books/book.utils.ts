import { Book } from 'library-api/src/entities';
import {
  BookRepositoryOutput,
  PlainBookRepositoryOutput,
} from 'library-api/src/repositories/books/book.repository.type';

export const adaptBookEntityToPlainBookModel = (
  book: Book,
): PlainBookRepositoryOutput => ({
  ...book,
  genres: book.genres,
});

export const adaptBookEntityToBookModel = (
  book: Book,
): BookRepositoryOutput => ({
  ...book,
  genres: book.genres ? book.genres : [],
});

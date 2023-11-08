import { Book } from 'library-api/src/entities';
import {
  BookRepositoryOutput,
  PlainBookRepositoryOutput,
} from 'library-api/src/repositories/books/book.repository.type';
import { CreateBookUseCasesInput } from 'library-api/src/useCases/books/book.useCases.type';

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

export const adaptBookEntityToCreateBookUseCasesInput = (
  book: Book,
): CreateBookUseCasesInput => ({
  ...book,
  genres: book.genres ? book.genres : [],
});

export const adaptBookEntityToBookRepositoryOutput = (
  book: Book,
): BookRepositoryOutput => ({
  ...book,
  genres: book.genres ? book.genres : [],
});

export const adaptBookEntityToCreateBookRepositoryInput = (
  book: Book,
): BookRepositoryOutput => ({
  ...book,
  genres: book.genres ? book.genres : [],
});

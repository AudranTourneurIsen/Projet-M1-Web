import { Book } from 'library-api/src/entities';
import {
  BookRepositoryOutput,
  CreateBookRepositoryInput,
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
  authorId: book.author.id,
});

export const adaptBookEntityToBookRepositoryOutput = (
  book: Book,
): BookRepositoryOutput => ({
  ...book,
  genres: book.genres ? book.genres : [],
  comments: book.comments ? book.comments : [],
});

export const adaptBookEntityToCreateBookRepositoryInput = (
  book: Book,
): CreateBookRepositoryInput => ({
  name: book.name,
  author: book.author,
  writtenOn: book.writtenOn,
  genres: book.genres ? book.genres : [],
  comments: book.comments ? book.comments : [],
  ownedByUsers: book.ownedByUsers ? book.ownedByUsers : [],
});

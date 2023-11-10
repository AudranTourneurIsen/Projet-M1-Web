import {
  authorFixture,
  bookFixture,
  genreFixture,
} from 'library-api/src/fixtures';
import {
  AuthorRepository,
  BookRepository,
  GenreRepository,
  UserRepository,
} from 'library-api/src/repositories';
import {
  adaptBookEntityToBookModel,
  adaptBookEntityToBookRepositoryOutput,
  adaptBookEntityToCreateBookUseCasesInput,
} from 'library-api/src/repositories/books/book.utils';
import { adaptGenreEntityToGenreRepositoryOutput } from 'library-api/src/repositories/genres/genre.utils';
import { CommentRepository } from 'library-api/src/repositories/comments/comment.repository';
import { BookUseCases } from './book.useCases';

describe('BookUseCases', () => {
  describe('getAll', () => {
    it('should call repository function', async () => {
      const repository1 = {} as unknown as CommentRepository;
      const repository2 = {
        getAllPlain: jest.fn(),
      } as unknown as BookRepository;
      const repository3 = {} as unknown as GenreRepository;
      const repository4 = {} as unknown as AuthorRepository;
      const repository5 = {} as unknown as UserRepository;
      const useCases = new BookUseCases(
        repository1,
        repository2,
        repository3,
        repository4,
        repository5,
      );
      const authorFix = authorFixture();
      const genreFix = genreFixture();
      const bookFix = [
        bookFixture(authorFix, [genreFix]),
        bookFixture(authorFix, [genreFix]),
        bookFixture(authorFix, [genreFix]),
      ].map(adaptBookEntityToBookRepositoryOutput);

      const getAllPlainSpy = jest
        .spyOn(repository2, 'getAllPlain')
        .mockResolvedValue(bookFix);

      const result = await useCases.getAllPlain();

      expect(getAllPlainSpy).toHaveBeenCalledTimes(1);
      expect(getAllPlainSpy).toHaveBeenCalledWith();

      expect(result).toStrictEqual(bookFix);
    });
  });

  describe('getById', () => {
    it('should call repository function', async () => {
      const repository1 = {} as unknown as CommentRepository;
      const repository2 = {
        getById: jest.fn(),
      } as unknown as BookRepository;
      const repository3 = {} as unknown as GenreRepository;
      const repository4 = {} as unknown as AuthorRepository;
      const repository5 = {} as unknown as UserRepository;
      const useCases = new BookUseCases(
        repository1,
        repository2,
        repository3,
        repository4,
        repository5,
      );
      const authorFix = authorFixture();
      const genreFix = genreFixture();
      const bookFix = adaptBookEntityToBookModel(
        bookFixture(authorFix, [genreFix]),
      );

      const getByIdSpy = jest
        .spyOn(repository2, 'getById')
        .mockResolvedValue(bookFix);

      const result = await useCases.getById(bookFix.id);

      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(getByIdSpy).toHaveBeenCalledWith(bookFix.id);

      expect(result).toStrictEqual(bookFix);
    });
  });

  describe('createBook', () => {
    it('should call repositories functions', async () => {
      const repository1 = {} as unknown as CommentRepository;
      const repository2 = {
        createBook: jest.fn(),
      } as unknown as BookRepository;
      const repository3 = {
        getByIds: jest.fn(),
      } as unknown as GenreRepository;
      const repository4 = {
        getById: jest.fn(),
      } as unknown as AuthorRepository;
      const repository5 = {} as unknown as UserRepository;
      const useCases = new BookUseCases(
        repository1,
        repository2,
        repository3,
        repository4,
        repository5,
      );
      const authorFix = authorFixture();
      const genreFix = genreFixture();
      const bookFix = bookFixture(authorFix, [genreFix]);

      const input1 = adaptBookEntityToCreateBookUseCasesInput(bookFix);

      const output1 = adaptBookEntityToBookRepositoryOutput(bookFix);

      const getByIdsGenreSpy = jest
        .spyOn(repository3, 'getByIds')
        .mockResolvedValue([adaptGenreEntityToGenreRepositoryOutput(genreFix)]);

      const getByIdAuthorSpy = jest
        .spyOn(repository4, 'getById')
        .mockResolvedValue(authorFix);

      const createBookSpy = jest
        .spyOn(repository2, 'createBook')
        .mockResolvedValue(output1);

      const result = await useCases.createBook(input1);

      expect(getByIdsGenreSpy).toHaveBeenCalledTimes(1);
      expect(getByIdsGenreSpy).toHaveBeenCalledWith([genreFix.id]);

      expect(getByIdAuthorSpy).toHaveBeenCalledTimes(1);
      expect(getByIdAuthorSpy).toHaveBeenCalledWith(authorFix.id);

      expect(createBookSpy).toHaveBeenCalledTimes(1);

      expect(result).toStrictEqual(output1);
    });
    it('should throw an error', async () => {
      const repository1 = {} as unknown as CommentRepository;
      const repository2 = {
        createBook: jest.fn(),
      } as unknown as BookRepository;
      const repository3 = {
        getByIds: jest.fn(),
      } as unknown as GenreRepository;
      const repository4 = {
        getById: jest.fn(),
      } as unknown as AuthorRepository;
      const repository5 = {} as unknown as UserRepository;
      const useCases = new BookUseCases(
        repository1,
        repository2,
        repository3,
        repository4,
        repository5,
      );
      const authorFix = authorFixture();
      const genreFix = genreFixture();

      authorFix.id = undefined;

      const bookFix = bookFixture(authorFix, [genreFix]);

      const input1 = adaptBookEntityToCreateBookUseCasesInput(bookFix);

      const output1 = adaptBookEntityToBookRepositoryOutput(bookFix);

      const getByIdsGenreSpy = jest
        .spyOn(repository3, 'getByIds')
        .mockResolvedValue([adaptGenreEntityToGenreRepositoryOutput(genreFix)]);

      const getByIdAuthorSpy = jest
        .spyOn(repository4, 'getById')
        .mockResolvedValue(undefined);

      const createBookSpy = jest
        .spyOn(repository2, 'createBook')
        .mockResolvedValue(output1);

      try {
        await useCases.createBook(input1);
      } catch (e) {
        expect(e.message).toMatch('Author not found');
      }

      expect(getByIdsGenreSpy).toHaveBeenCalledTimes(1);
      expect(getByIdsGenreSpy).toHaveBeenCalledWith([genreFix.id]);

      expect(getByIdAuthorSpy).toHaveBeenCalledTimes(1);
      expect(getByIdAuthorSpy).toHaveBeenCalledWith(authorFix.id);

      expect(createBookSpy).toHaveBeenCalledTimes(0);
    });
  });
  describe('deleteBook', () => {
    it('should call repository function', async () => {
      const repository1 = {} as unknown as CommentRepository;
      const repository2 = {
        deleteBook: jest.fn(),
        getById: jest.fn(),
      } as unknown as BookRepository;
      const repository3 = {} as unknown as GenreRepository;
      const repository4 = {} as unknown as AuthorRepository;
      const repository5 = {} as unknown as UserRepository;
      const useCases = new BookUseCases(
        repository1,
        repository2,
        repository3,
        repository4,
        repository5,
      );
      const authorFix = authorFixture();
      const genreFix = genreFixture();
      const bookFix = bookFixture(authorFix, [genreFix]);

      const getByIdSpy = jest
        .spyOn(repository2, 'getById')
        .mockResolvedValue(bookFix);

      const deleteBookSpy = jest
        .spyOn(repository2, 'deleteBook')
        .mockResolvedValue();

      await useCases.deleteBook(bookFix.id);

      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(getByIdSpy).toHaveBeenCalledWith(bookFix.id);

      expect(deleteBookSpy).toHaveBeenCalledTimes(1);
      expect(deleteBookSpy).toHaveBeenCalledWith(bookFix.id);
    });
    it('should throw an error', async () => {
      const repository1 = {} as unknown as CommentRepository;
      const repository2 = {
        deleteBook: jest.fn(),
        getById: jest.fn(),
      } as unknown as BookRepository;
      const repository3 = {} as unknown as GenreRepository;
      const repository4 = {} as unknown as AuthorRepository;
      const repository5 = {} as unknown as UserRepository;
      const useCases = new BookUseCases(
        repository1,
        repository2,
        repository3,
        repository4,
        repository5,
      );
      const authorFix = authorFixture();
      const genreFix = genreFixture();
      const bookFix = bookFixture(authorFix, [genreFix]);

      const getByIdSpy = jest
        .spyOn(repository2, 'getById')
        .mockResolvedValue(undefined);

      const deleteBookSpy = jest
        .spyOn(repository2, 'deleteBook')
        .mockResolvedValue();

      try {
        await useCases.deleteBook(bookFix.id);
      } catch (e) {
        expect(e.message).toMatch('Book not found');
      }

      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(getByIdSpy).toHaveBeenCalledWith(bookFix.id);

      expect(deleteBookSpy).toHaveBeenCalledTimes(0);
    });
  });
});

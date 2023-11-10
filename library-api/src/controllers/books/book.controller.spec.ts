import { BookUseCases } from 'library-api/src/useCases';
import { authorFixture, bookFixture } from 'library-api/src/fixtures';
import { BookController } from './book.controller';
import { BookPresenter, PlainBookPresenter } from './book.presenter';

describe('BookController', () => {
  describe('getAll', () => {
    it('should return all books', async () => {
      const useCases = {
        getAllPlain: jest.fn(),
      } as unknown as BookUseCases;
      const controller = new BookController(useCases);
      const author = authorFixture();
      const fixtures = [
        bookFixture(author, []),
        bookFixture(author, []),
        bookFixture(author, []),
      ];

      const getAllPlainSpy = jest
        .spyOn(useCases, 'getAllPlain')
        .mockResolvedValue(fixtures);

      const result = await controller.getAll();

      expect(getAllPlainSpy).toHaveBeenCalledTimes(1);
      expect(getAllPlainSpy).toHaveBeenCalledWith();

      expect(result).toStrictEqual(fixtures.map(PlainBookPresenter.from));
    });
  });
  describe('getById', () => {
    it('should return the book corresponding to the id', async () => {
      const useCases = {
        getById: jest.fn(),
      } as unknown as BookUseCases;
      const controller = new BookController(useCases);
      const author = authorFixture();
      const fixture = bookFixture(author, []);

      const getByIdSpy = jest
        .spyOn(useCases, 'getById')
        .mockResolvedValue(fixture);

      const result = await controller.getById(fixture.id);

      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(getByIdSpy).toHaveBeenCalledWith(fixture.id);

      expect(result).toStrictEqual(BookPresenter.from(fixture));
    });
  });
  describe('createBook', () => {
    it('should throw an error', async () => {
      const useCases = {
        createBook: jest.fn(),
      } as unknown as BookUseCases;
      const controller = new BookController(useCases);
      const author = authorFixture();
      const fixture = bookFixture(author, []);

      const createBookSpy = jest
        .spyOn(useCases, 'createBook')
        .mockResolvedValue(fixture);

      const tmp = {
        ...fixture,
        authorId: fixture.author.id,
      };

      const result = await controller.createBook(tmp);

      expect(createBookSpy).toHaveBeenCalledTimes(1);
      expect(createBookSpy).toHaveBeenCalledWith(tmp);

      expect(result).toStrictEqual(BookPresenter.from(fixture));
    });
  });
  describe('deleteBook', () => {
    it('should call the use case', async () => {
      const useCases = {
        deleteBook: jest.fn(),
      } as unknown as BookUseCases;
      const controller = new BookController(useCases);
      const author = authorFixture();
      const fixture = bookFixture(author, []);

      const deleteBookSpy = jest
        .spyOn(useCases, 'deleteBook')
        .mockResolvedValue();

      const result = await controller.deleteBook(fixture.id);

      expect(deleteBookSpy).toHaveBeenCalledTimes(1);
      expect(deleteBookSpy).toHaveBeenCalledWith(fixture.id);

      expect(result).toStrictEqual(undefined);
    });
  });
});

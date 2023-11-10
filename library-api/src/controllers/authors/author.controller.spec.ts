import { AuthorUseCases } from 'library-api/src/useCases';
import { authorFixture } from 'library-api/src/fixtures';
import { AuthorController } from './author.controller';
import { AuthorPresenter, PlainAuthorPresenter } from './author.presenter';

describe('AuthorController', () => {
  describe('getAll', () => {
    it('should return all authors', async () => {
      const useCases = {
        getAllPlain: jest.fn(),
      } as unknown as AuthorUseCases;
      const controller = new AuthorController(useCases);
      const fixtures = [authorFixture(), authorFixture(), authorFixture()];

      const getAllPlainSpy = jest
        .spyOn(useCases, 'getAllPlain')
        .mockResolvedValue(fixtures);

      const result = await controller.getAll();

      expect(getAllPlainSpy).toHaveBeenCalledTimes(1);
      expect(getAllPlainSpy).toHaveBeenCalledWith();

      expect(result).toStrictEqual(fixtures.map(PlainAuthorPresenter.from));
    });
  });
  describe('getById', () => {
    it('should return the author corresponding to the id', async () => {
      const useCases = {
        getById: jest.fn(),
      } as unknown as AuthorUseCases;
      const controller = new AuthorController(useCases);
      const fixture = authorFixture();

      const getByIdSpy = jest
        .spyOn(useCases, 'getById')
        .mockResolvedValue(fixture);

      const result = await controller.getById(fixture.id);

      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(getByIdSpy).toHaveBeenCalledWith(fixture.id);

      expect(result).toStrictEqual(AuthorPresenter.from(fixture));
    });
  });
  describe('createAuthor', () => {
    it('should throw an error', async () => {
      const useCases = {
        createAuthor: jest.fn(),
      } as unknown as AuthorUseCases;
      const controller = new AuthorController(useCases);
      const fixture = authorFixture();

      const createAuthorSpy = jest
        .spyOn(useCases, 'createAuthor')
        .mockResolvedValue(fixture);

      const file = undefined;

      try {
        await controller.createAuthor(file, fixture);
      } catch (error) {
        expect(error.message).toBe(
          "Cannot read properties of undefined (reading 'mimetype')",
        );
      }

      expect(createAuthorSpy).toHaveBeenCalledTimes(0);
    });
  });
});

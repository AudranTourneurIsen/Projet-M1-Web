import { GenreUseCases } from '../../useCases';
import { GenreController } from './genre.controller';
import { genreFixture } from '../../fixtures';
import { PlainGenrePresenter } from './genre.presenter';

describe('GenreController', () => {
  describe('getAll', () => {
    it('should return all authors', async () => {
      const useCases = {
        getAllPlain: jest.fn(),
      } as unknown as GenreUseCases;
      const controller = new GenreController(useCases);
      const fixtures = [genreFixture(), genreFixture(), genreFixture()];
      const getAllPlainSpy = jest
        .spyOn(useCases, 'getAllPlain')
        .mockResolvedValue(fixtures);
      const result = await controller.getAll();
      expect(getAllPlainSpy).toHaveBeenCalledTimes(1);
      expect(getAllPlainSpy).toHaveBeenCalledWith();
      expect(result).toStrictEqual(fixtures.map(PlainGenrePresenter.from));
    });
  });

  describe('getById', () => {
    it('should return the author corresponding to the id', async () => {
      const useCases = {
        getById: jest.fn(),
      } as unknown as GenreUseCases;
      const controller = new GenreController(useCases);
      const fixture = genreFixture();
      const getByIdSpy = jest
        .spyOn(useCases, 'getById')
        .mockResolvedValue(fixture);
      const result = await controller.getById(fixture.id);
      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(getByIdSpy).toHaveBeenCalledWith(fixture.id);
      expect(result).toBeDefined();
      expect(result.id).toEqual(fixture.id);
    });
  });
});

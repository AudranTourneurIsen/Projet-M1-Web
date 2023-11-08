import { genreFixture } from 'library-api/src/fixtures';
import { GenreRepository } from 'library-api/src/repositories';
import {
  adaptGenreEntityToGenreModel,
  adaptGenreEntityToGenreRepositoryOutput,
} from 'library-api/src/repositories/genres/genre.utils';
import { GenreUseCases } from './genre.useCases';

describe('GenreUseCases', () => {
  describe('getAll', () => {
    it('should call repository function', async () => {
      const repository1 = {
        getAllPlain: jest.fn(),
      } as unknown as GenreRepository;
      const useCases = new GenreUseCases(repository1);
      const genreFix = [genreFixture(), genreFixture(), genreFixture()].map(
        adaptGenreEntityToGenreRepositoryOutput,
      );

      const getAllPlainSpy = jest
        .spyOn(repository1, 'getAllPlain')
        .mockResolvedValue(genreFix);

      const result = await useCases.getAllPlain();

      expect(getAllPlainSpy).toHaveBeenCalledTimes(1);
      expect(getAllPlainSpy).toHaveBeenCalledWith();

      expect(result).toStrictEqual(genreFix);
    });
  });

  describe('getById', () => {
    it('should call repository function', async () => {
      const repository1 = {
        getById: jest.fn(),
      } as unknown as GenreRepository;
      const useCases = new GenreUseCases(repository1);
      const genreFix = adaptGenreEntityToGenreModel(genreFixture());

      const getByIdSpy = jest
        .spyOn(repository1, 'getById')
        .mockResolvedValue(genreFix);

      const result = await useCases.getById(genreFix.id);

      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(getByIdSpy).toHaveBeenCalledWith(genreFix.id);

      expect(result).toStrictEqual(genreFix);
    });
  });

  describe('getByIds', () => {
    it('should call repository function', async () => {
      const repository1 = {
        getByIds: jest.fn(),
      } as unknown as GenreRepository;
      const useCases = new GenreUseCases(repository1);
      const genreFix = [genreFixture(), genreFixture(), genreFixture()].map(
        adaptGenreEntityToGenreRepositoryOutput,
      );

      const getByIdsSpy = jest
        .spyOn(repository1, 'getByIds')
        .mockResolvedValue(genreFix);

      const result = await useCases.getByIds(genreFix.map((g) => g.id));

      expect(getByIdsSpy).toHaveBeenCalledTimes(1);
      expect(getByIdsSpy).toHaveBeenCalledWith(genreFix.map((g) => g.id));

      expect(result).toStrictEqual(genreFix);
    });
  });
});

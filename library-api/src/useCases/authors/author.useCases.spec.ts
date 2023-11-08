import { authorFixture } from 'library-api/src/fixtures';
import { AuthorRepository } from 'library-api/src/repositories';
import { adaptAuthorToPlainAuthorRepositoryOutput } from 'library-api/src/repositories/authors/author.utils';
import { ImageRepository } from 'library-api/src/repositories/images/image.repository';
import { AuthorUseCases } from './author.useCases';

describe('AuthorUseCases', () => {
  describe('getAll', () => {
    it('should call repository function', async () => {
      const repository1 = {
        getAllPlain: jest.fn(),
      } as unknown as AuthorRepository;
      const repository2 = {
        getAllPlain: jest.fn(),
      } as unknown as ImageRepository;
      const useCases = new AuthorUseCases(repository1, repository2);
      const fixtures = [authorFixture(), authorFixture(), authorFixture()].map(
        adaptAuthorToPlainAuthorRepositoryOutput,
      );

      const getAllPlainSpy = jest
        .spyOn(repository1, 'getAllPlain')
        .mockResolvedValue(fixtures);

      const result = await useCases.getAllPlain();

      expect(getAllPlainSpy).toHaveBeenCalledTimes(1);
      expect(getAllPlainSpy).toHaveBeenCalledWith();

      expect(result).toStrictEqual(fixtures);
    });
  });

  describe('getById', () => {
    it('should call repository function', async () => {
      const repository1 = {
        getById: jest.fn(),
      } as unknown as AuthorRepository;
      const repository2 = {
        getById: jest.fn(),
      } as unknown as ImageRepository;
      const useCases = new AuthorUseCases(repository1, repository2);
      const fixture = adaptAuthorToPlainAuthorRepositoryOutput(authorFixture());

      const getByIdSpy = jest
        .spyOn(repository1, 'getById')
        .mockResolvedValue(fixture);

      const result = await useCases.getById(fixture.id);

      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(getByIdSpy).toHaveBeenCalledWith(fixture.id);

      expect(result).toStrictEqual(fixture);
    });
  });

  describe('createAuthor', () => {
    it('should call repositories functions', async () => {
      const repository1 = {
        getAllPlain: jest.fn(),
      } as unknown as AuthorRepository;
      const repository2 = {
        getAllPlain: jest.fn(),
      } as unknown as ImageRepository;
      const useCases = new AuthorUseCases(repository1, repository2);
      const fixture = authorFixture();
      const input = adaptAuthorToPlainAuthorRepositoryOutput(fixture);
      const output = adaptAuthorToPlainAuthorRepositoryOutput(fixture);

      const createAuthorSpy = jest
        .spyOn(repository1, 'createAuthor')
        .mockResolvedValue(output);

      const result = await useCases.createAuthor(input, Buffer.from(''));

      expect(createAuthorSpy).toHaveBeenCalledTimes(1);
      expect(createAuthorSpy).toHaveBeenCalledWith(input);

      expect(result).toStrictEqual(output);
    });
  });
});

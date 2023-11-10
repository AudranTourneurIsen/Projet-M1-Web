import { authorFixture, imageFixture } from 'library-api/src/fixtures';
import { AuthorRepository, BookRepository } from 'library-api/src/repositories';
import {
  adaptAuthorEntityToAuthorModel,
  adaptAuthorToCreateAuthorRepositoryInput,
  adaptAuthorToPlainAuthorRepositoryOutput,
} from 'library-api/src/repositories/authors/author.utils';
import { ImageRepository } from 'library-api/src/repositories/images/image.repository';
import { adaptImageEntityToCreateImageRepositoryInput } from 'library-api/src/repositories/images/image.utils';
import { faker } from '@faker-js/faker';
import { AuthorUseCases } from './author.useCases';

describe('AuthorUseCases', () => {
  describe('getAll', () => {
    it('should call repository function', async () => {
      const repository1 = {
        getAllPlain: jest.fn(),
      } as unknown as AuthorRepository;
      const repository2 = {} as unknown as ImageRepository;
      const repository3 = {} as unknown as BookRepository;
      const useCases = new AuthorUseCases(
        repository1,
        repository2,
        repository3,
      );
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
      const repository2 = {} as unknown as ImageRepository;
      const repository3 = {} as unknown as BookRepository;
      const useCases = new AuthorUseCases(
        repository1,
        repository2,
        repository3,
      );
      const fixture = adaptAuthorEntityToAuthorModel(authorFixture());

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
        createAuthor: jest.fn(),
      } as unknown as AuthorRepository;
      const repository2 = {
        createImage: jest.fn(),
      } as unknown as ImageRepository;
      const repository3 = {} as unknown as BookRepository;
      const useCases = new AuthorUseCases(
        repository1,
        repository2,
        repository3,
      );

      const input2 = Buffer.from(faker.string.sample(8));
      const imageFix = imageFixture(input2);
      const input3 = adaptImageEntityToCreateImageRepositoryInput(imageFix);

      const authorFix = authorFixture(imageFix);
      const input1 = adaptAuthorToCreateAuthorRepositoryInput(authorFix);

      const output1 = adaptAuthorEntityToAuthorModel(authorFix);

      const createAuthorSpy = jest
        .spyOn(repository1, 'createAuthor')
        .mockResolvedValue(output1);

      const createImageSpy = jest
        .spyOn(repository2, 'createImage')
        .mockResolvedValue(imageFix);

      const result = await useCases.createAuthor(input1, input2);

      expect(createImageSpy).toHaveBeenCalledTimes(1);
      expect(createImageSpy).toHaveBeenCalledWith(input3);

      expect(createAuthorSpy).toHaveBeenCalledTimes(1);
      expect(createAuthorSpy).toHaveBeenCalledWith(input1);

      expect(result).toStrictEqual(output1);
    });
  });
});

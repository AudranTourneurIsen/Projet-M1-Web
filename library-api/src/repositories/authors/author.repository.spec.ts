import { DataSource } from 'typeorm';
import { authorFixture } from 'library-api/src/fixtures';
import { HttpStatus } from '@nestjs/common';
import { AuthorRepository } from './author.repository';
import { adaptAuthorToPlainAuthorRepositoryOutput } from './author.utils';

describe('AuthorRepository', () => {
  describe('getAllPlain', () => {
    it('should return all authors', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new AuthorRepository(dataSource);
      const fixtures = [authorFixture(), authorFixture(), authorFixture()];

      const findSpy = jest
        .spyOn(repository, 'find')
        .mockResolvedValue(fixtures);

      const result = await repository.getAllPlain();

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        relations: { books: { genres: true }, photo: true },
      });

      expect(result).toStrictEqual(
        fixtures.map(adaptAuthorToPlainAuthorRepositoryOutput),
      );
    });
  });

  describe('getById', () => {
    it('should return the author corresponding to the id', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new AuthorRepository(dataSource);
      const fixture = authorFixture();

      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(fixture);

      const result = await repository.getById(fixture.id);

      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({
        relations: { photo: true },
        where: { id: fixture.id },
      });

      expect(result).toStrictEqual(
        adaptAuthorToPlainAuthorRepositoryOutput(fixture),
      );
    });

    it('should return a 404 error', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new AuthorRepository(dataSource);
      const fixture = authorFixture();

      const findOneSpy = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(fixture);

      try {
        await repository.getById(undefined);
      } catch (e) {
        expect(e.message).toBe(`Author - '${fixture.id}'`);
        expect(e.status).toBe(HttpStatus.NOT_FOUND);
      }

      expect(findOneSpy).toHaveBeenCalledTimes(1);
      expect(findOneSpy).toHaveBeenCalledWith({
        relations: { photo: true },
        where: { id: undefined },
      });
    });
  });
});

import { userFixture } from 'library-api/src/fixtures';
import {
  BookRepository,
  GenreRepository,
  UserRepository,
} from 'library-api/src/repositories';
import { clone } from 'lodash';
import { adaptUserEntityToUserRepositoryOutput } from 'library-api/src/repositories/users/user.utils';
import { UserUseCases } from './user.useCases';

describe('UserUseCases', () => {
  describe('getAll', () => {
    it('should call repository function', async () => {
      const userRep = {
        getAllPlain: jest.fn(),
      } as unknown as UserRepository;
      const bookRep = {} as unknown as BookRepository;
      const genreRep = {} as unknown as GenreRepository;

      const user1 = userFixture(null, [], [], []);
      const user2 = clone(user1);
      const user3 = clone(user1);

      const useCases = new UserUseCases(userRep, bookRep, genreRep);
      const userFix = [user1, user2, user3].map(
        adaptUserEntityToUserRepositoryOutput,
      );

      const getAllPlainSpy = jest
        .spyOn(userRep, 'getAllPlain')
        .mockResolvedValue(userFix);

      const result = await useCases.getAllPlain();

      expect(getAllPlainSpy).toHaveBeenCalledTimes(1);
      expect(getAllPlainSpy).toHaveBeenCalledWith();

      expect(result).toStrictEqual(userFix);
    });
  });

  describe('getById', () => {
    it('should call repository function', async () => {
      const userRep = {
        getById: jest.fn(),
      } as unknown as UserRepository;
      const bookRep = {} as unknown as BookRepository;
      const genreRep = {} as unknown as GenreRepository;

      const user = userFixture(null, [], [], []);
      const useCases = new UserUseCases(userRep, bookRep, genreRep);
      const userFix = adaptUserEntityToUserRepositoryOutput(user);

      const getByIdSpy = jest
        .spyOn(userRep, 'getById')
        .mockResolvedValue(userFix);

      const result = await useCases.getById(userFix.id);

      expect(getByIdSpy).toHaveBeenCalledTimes(1);
      expect(getByIdSpy).toHaveBeenCalledWith(userFix.id);

      expect(result).toStrictEqual(userFix);
    });
  });
});

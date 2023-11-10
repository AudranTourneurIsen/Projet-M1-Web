import { clone } from 'lodash';
import { UserUseCases } from 'library-api/src/useCases';
import { UserController } from './user.controller';
import { userFixture } from '../../fixtures';
import { PlainUserPresenter } from './user.presenter';

describe('UserController', () => {
  describe('getAll', () => {
    it('should return all users', async () => {
      const useCases = {
        getAllPlain: jest.fn(),
      } as unknown as UserUseCases;
      const controller = new UserController(useCases);

      const user1 = userFixture(null, [], [], []);
      const user2 = clone(user1);
      const user3 = clone(user1);

      const fixtures = [user1, user2, user3];

      const getAllPlainSpy = jest
        .spyOn(useCases, 'getAllPlain')
        .mockResolvedValue(fixtures);
      const result = await controller.getAll();
      expect(getAllPlainSpy).toHaveBeenCalledTimes(1);
      expect(getAllPlainSpy).toHaveBeenCalledWith();
      expect(result).toStrictEqual(fixtures.map(PlainUserPresenter.from));
    });
  });

  describe('getById', () => {
    it('should return the user corresponding to the id', async () => {
      const useCases = {
        getById: jest.fn(),
      } as unknown as UserUseCases;
      const controller = new UserController(useCases);
      const fixture = userFixture(null, [], [], []);
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

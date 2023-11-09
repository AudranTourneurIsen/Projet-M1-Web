import { Injectable } from '@nestjs/common';
import { User, UserId } from 'library-api/src/entities';
import { DataSource, In, Repository } from 'typeorm';
import { NotFoundError } from 'library-api/src/common/errors';
import {
  UserRepositoryOutput,
  CreateUserRepositoryInput as EditUserRepositoryInput,
  PlainUserRepositoryOutput,
} from './user.repository.type';
import {
  adaptUserEntityToUserModel,
  adaptUserEntityToPlainUserModel,
} from './user.utils';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(public readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<PlainUserRepositoryOutput[]> {
    const books = await this.find({
      relations: {
        favoriteBook: { author: true, genres: true },
        ownedBooks: true,
      },
    });

    return books.map(adaptUserEntityToPlainUserModel);
  }

  /**
   * Get a user by its ID
   * @param id User's ID
   * @returns User if found
   * @throws 404: user with this ID was not found
   */
  public async getById(id: UserId): Promise<UserRepositoryOutput> {
    const user = await this.findOne({
      where: { id },
      relations: {
        favoriteBook: { author: true, genres: true },
        ownedBooks: true,
        favoriteGenres: true,
        friends: true,
      },
    });

    if (!user) {
      throw new NotFoundError(`User - '${id}'`);
    }

    return adaptUserEntityToUserModel(user);
  }

  /**
   * Create a new user
   * @param user User to create
   * @returns Created user
   */
  public async createUser(
    user: EditUserRepositoryInput,
  ): Promise<UserRepositoryOutput> {
    const createdUser = await this.save(user);

    return adaptUserEntityToUserModel(createdUser);
  }

  /**
   * Edit the user
   * @param user User to edit
   * @returns Edited user
   */

  public async editUser(
    user: EditUserRepositoryInput,
  ): Promise<UserRepositoryOutput> {
    const editedUser = await this.save(user);

    return adaptUserEntityToUserModel(editedUser);
  }

  /**
   * Get users by their IDs
   * @param ids Users' IDs
   * @returns Users if found
   */

  public async getByIds(ids: UserId[]): Promise<UserRepositoryOutput[]> {
    const users = await this.find({ where: { id: In(ids) } });

    return users.map(adaptUserEntityToUserModel);
  }

  /**
   * Delete a user
   * @param id User's ID
   */

  public async deleteUser(id: UserId): Promise<void> {
    await this.delete(id);
  }
}

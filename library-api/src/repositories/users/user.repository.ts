import { Injectable } from '@nestjs/common';
import { User, UserId } from 'library-api/src/entities';
import { DataSource, Repository } from 'typeorm';
import { NotFoundError } from 'library-api/src/common/errors';
import {
  UserRepositoryOutput,
  CreateUserRepositoryInput,
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
      relations: { favoriteBook: { author: true, genres: true }, ownedBooks : true },
    });

    return books.map(adaptUserEntityToPlainUserModel);
  }

  /**
   * Get a book by its ID
   * @param id User's ID
   * @returns User if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: UserId): Promise<UserRepositoryOutput> {
    const book = await this.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundError(`User - '${id}'`);
    }

    return adaptUserEntityToUserModel(book);
  }

  /**
   * Create a new user
   * @param user User to create
   * @returns Created user
   */
  public async createUser(
    user: CreateUserRepositoryInput,
  ): Promise<UserRepositoryOutput> {
    const createdUser = await this.save(user);

    return adaptUserEntityToUserModel(createdUser);
  }
}

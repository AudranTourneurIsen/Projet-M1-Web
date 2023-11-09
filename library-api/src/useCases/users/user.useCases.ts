import { Injectable } from '@nestjs/common';
import {
  BookRepository,
  GenreRepository,
  UserRepository,
} from 'library-api/src/repositories';
import { BookId, GenreId, UserId } from 'library-api/src/entities';
import { NotFoundError } from 'library-api/src/common/errors';
import {
  UserUseCasesOutput,
  CreateUserUseCasesInput,
  PlainUserUseCasesOutput,
} from './user.useCases.type';

@Injectable()
export class UserUseCases {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bookRepository: BookRepository,
    private readonly genreRepository: GenreRepository,
  ) {}

  /**
   * Get all plain users
   * @returns Array of plain users
   */
  public async getAllPlain(): Promise<PlainUserUseCasesOutput[]> {
    return this.userRepository.getAllPlain();
  }

  /**
   * Get a user by its ID
   * @param id User's ID
   * @returns User if found
   * @throws 404: user with this ID was not found
   */
  public async getById(id: UserId): Promise<UserUseCasesOutput> {
    return this.userRepository.getById(id);
  }

  /**
   * Create a new user
   * @param user User to create
   * @returns Created user
   */
  public async createUser(
    user: CreateUserUseCasesInput,
  ): Promise<UserUseCasesOutput> {
    return this.userRepository.createUser(user);
  }

  /**
   * Edit the favorite book of a user
   * @param userId User's ID
   * @param bookId Book's ID
   * @returns Edited user
   * @throws 404: user with this ID was not found
   * @throws 404: book with this ID was not found
   */

  public async editFavoriteBook(
    userId: UserId,
    bookId: BookId,
  ): Promise<UserUseCasesOutput> {
    const book = await this.bookRepository.getById(bookId);

    if (!book) {
      throw new NotFoundError(`Book - '${bookId}'`);
    }

    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new NotFoundError(`User - '${userId}'`);
    }

    user.favoriteBook = book;

    return this.userRepository.editUser(user);
  }

  /**
   * Edit the favorite genres of a user
   * @param userId User's ID
   * @param genresIds Genres' IDs
   * @returns Edited user
   * @throws 404: user with this ID was not found
   */

  public async editFavoriteGenres(
    userId: UserId,
    genresIds: GenreId[],
  ): Promise<UserUseCasesOutput> {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new NotFoundError(`User - '${userId}'`);
    }

    const genres = await this.genreRepository.getByIds(genresIds);

    user.favoriteGenres = genres;

    return this.userRepository.editUser(user);
  }

  /**
   * Edit the owned books of a user
   * @param userId User's ID
   * @param booksIds Books' IDs
   * @returns Edited user
   * @throws 404: user with this ID was not found
   * @throws 404: book with this ID was not found
   */

  public async editOwnedBooks(
    userId: UserId,
    booksIds: BookId[],
  ): Promise<UserUseCasesOutput> {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new NotFoundError(`User - '${userId}'`);
    }

    const books = await this.bookRepository.getByIds(booksIds);

    user.ownedBooks = books;

    return this.userRepository.editUser(user);
  }

  /**
   * Edit the friends of a user
   * @param userId User's ID
   * @param friendsIds Users' IDs
   * @returns Edited user
   * @throws 404: user with this ID was not found
   */

  public async editFriends(
    userId: UserId,
    friendsIds: UserId[],
  ): Promise<UserUseCasesOutput> {
    const users = await this.userRepository.getByIds(friendsIds);

    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new NotFoundError(`User - '${userId}'`);
    }

    user.friends = users;

    return this.userRepository.editUser(user);
  }

  /**
   * Delete a user
   * @param userId User's ID
   * @returns Deleted user
   * @throws 404: user with this ID was not found
   */

  public async deleteUser(userId: UserId): Promise<void> {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new NotFoundError(`User - '${userId}'`);
    }

    this.userRepository.deleteUser(userId);
  }
}

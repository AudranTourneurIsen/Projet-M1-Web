import { faker } from '@faker-js/faker';
import { UserId, User, Book } from 'library-api/src/entities';
import { Genre } from '../../../dist/entities';

export const userFixture = (
  favoriteBook: Book,
  favoriteGenres: Genre[],
  friends: User[],
  ownedBooks: Book[],
): User =>
  ({
    id: faker.string.uuid() as UserId,
    favoriteGenres,
    firstName: faker.string.sample(8),
    lastName: faker.string.sample(8),
    favoriteBook,
    friends,
    ownedBooks,
  }) as User;

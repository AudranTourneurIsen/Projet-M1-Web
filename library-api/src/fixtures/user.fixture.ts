import { faker } from '@faker-js/faker';
import { UserId, User, Book, Genre } from 'library-api/src/entities';

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

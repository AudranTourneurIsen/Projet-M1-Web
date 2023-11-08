import { faker } from '@faker-js/faker';
import { Author, Book, BookId, Genre } from 'library-api/src/entities';

export const bookFixture = (author: Author, genres: Genre[]): Book =>
  ({
    id: faker.string.uuid() as BookId,
    name: faker.string.sample(8),
    author,
    genres,
  }) as Book;

import { Author } from 'library-api/src/entities/Author';
import { Book } from 'library-api/src/entities/Book';
import { Genre } from 'library-api/src/entities/Genre';
import { User } from 'library-api/src/entities/User';

export * from './Author';
// eslint-disable-next-line import/no-cycle
export * from './Book';
export * from './Genre';
export * from './User';

export const entities = [Author, Book, Genre, User];

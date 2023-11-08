import { authorFixture } from 'library-api/src/fixtures/author.fixture';
import { imageFixture } from 'library-api/src/fixtures/image.fixture';
import { bookFixture } from 'library-api/src/fixtures/book.fixture';
import { genreFixture } from 'library-api/src/fixtures/genre.fixture';

export * from './author.fixture';
export * from './image.fixture';
export * from './book.fixture';
export * from './genre.fixture';

export const entities = [
  authorFixture,
  imageFixture,
  bookFixture,
  genreFixture,
];

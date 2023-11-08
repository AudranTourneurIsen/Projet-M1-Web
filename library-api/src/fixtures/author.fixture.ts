import { faker } from '@faker-js/faker';
import { Author, AuthorId, Image } from 'library-api/src/entities';

export const authorFixture = (photo?: Image): Author =>
  ({
    id: faker.string.uuid() as AuthorId,
    firstName: faker.string.sample(8),
    lastName: faker.string.sample(8),
    photo,
  }) as Author;

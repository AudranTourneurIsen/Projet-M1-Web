import { Author } from 'library-api/src/entities';

import {
  AuthorRepositoryOutput,
  PlainAuthorRepositoryOutput,
} from 'library-api/src/repositories/authors/author.repository.type';

export const adaptAuthorEntityToPlainAuthorModel = (
  author: Author,
): PlainAuthorRepositoryOutput => ({
  ...author,
});

export const adaptAuthorEntityToAuthorModel = (
  author: Author,
): AuthorRepositoryOutput => ({
  ...author,
});

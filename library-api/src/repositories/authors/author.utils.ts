import { Author } from 'library-api/src/entities';

import {
  AuthorRepositoryOutput,
  CreateAuthorRepositoryInput,
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

export const adaptAuthorToPlainAuthorRepositoryOutput = (
  author: Author,
): PlainAuthorRepositoryOutput => ({
  id: author.id,
  firstName: author.firstName,
  lastName: author.lastName,
});

export const adaptAuthorToCreateAuthorRepositoryInput = (
  author: Author,
): CreateAuthorRepositoryInput => ({
  firstName: author.firstName,
  lastName: author.lastName,
});

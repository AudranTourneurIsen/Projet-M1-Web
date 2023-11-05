import {
  AuthorModel,
  PlainAuthorModel,
} from 'library-api/src/models/author.model';

export type PlainAuthorRepositoryOutput = PlainAuthorModel;
export type AuthorRepositoryOutput = AuthorModel;
export type CreateAuthorRepositoryInput = Omit<AuthorModel, 'id'>;

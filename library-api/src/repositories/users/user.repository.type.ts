import { UserModel, PlainUserModel } from 'library-api/src/models/user.model';

export type PlainUserRepositoryOutput = PlainUserModel;
export type UserRepositoryOutput = UserModel;
export type CreateUserRepositoryInput = Omit<UserModel, 'id'>;
export type EditBookRepositoryInput = Omit<UserModel, 'id'>;

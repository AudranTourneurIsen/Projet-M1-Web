import { UserId } from 'library-api/src/entities';

export type PlainUserModel = {
  id: UserId;
  firstName: string;
  lastName: string;
};

export type UserModel = {
  id: UserId;
  firstName: string;
  lastName: string;
};

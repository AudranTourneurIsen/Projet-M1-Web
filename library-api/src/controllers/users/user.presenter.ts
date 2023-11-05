import {
  GenrePresenter,
  PlainGenrePresenter,
} from 'library-api/src/controllers/genres/genre.presenter';
import { UserId } from 'library-api/src/entities';
import { UserModel, PlainUserModel } from 'library-api/src/models';
import { BookPresenter, PlainBookPresenter } from '../books/book.presenter';

export class PlainUserPresenter {
  id: UserId;

  firstName: string;

  lastName: string;

  ownedBooks?: PlainBookPresenter[];

  favoriteBook?: PlainBookPresenter;

  favoriteGenres?: PlainGenrePresenter[];

  // eslint-disable-next-line no-use-before-define
  friends?: PlainUserPresenter[];

  private constructor(data: PlainUserPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainUserModel): PlainUserPresenter {
    return new PlainUserPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      ownedBooks: data.ownedBooks,
      favoriteBook: data.favoriteBook,
      favoriteGenres: data.favoriteGenres,
      friends: data.friends,
    });
  }
}

export class UserPresenter {
  id: UserId;

  firstName: string;

  lastName: string;

  ownedBooks?: BookPresenter[];

  favoriteBook?: BookPresenter;

  favoriteGenres?: GenrePresenter[];

  // eslint-disable-next-line no-use-before-define
  friends?: UserPresenter[];

  private constructor(data: UserPresenter) {
    Object.assign(this, data);
  }

  public static from(data: UserModel): UserPresenter {
    return new UserPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      ownedBooks: data.ownedBooks?.map(BookPresenter.from),
      favoriteBook: data.favoriteBook && BookPresenter.from(data.favoriteBook),
      favoriteGenres: data.favoriteGenres?.map(GenrePresenter.from),
      friends: data.friends?.map(UserPresenter.from),
    });
  }
}

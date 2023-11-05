import { PlainAuthorPresenter } from 'library-api/src/controllers/authors/author.presenter';
import { GenrePresenter } from 'library-api/src/controllers/genres/genre.presenter';
import { Book, Genre, UserId } from 'library-api/src/entities';
import { UserModel, PlainUserModel } from 'library-api/src/models';

export class PlainUserPresenter {
  id: UserId;

  firstName: string;

  lastName: string;

  ownedBooks?: Book[];

  favoriteBook?: Book;

  favoriteGenres?: Genre[];

  friends?: User[];

  private constructor(data: PlainUserPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainUserModel): PlainUserPresenter {
    return new PlainUserPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
    });
  }
}

export class UserPresenter {
  id: string;

  name: string;

  author: PlainAuthorPresenter;

  writtenOn: Date;

  genres: GenrePresenter[];

  private constructor(data: UserPresenter) {
    Object.assign(this, data);
  }

  public static from(data: UserModel): UserPresenter {
    return new UserPresenter({
      id: data.id,
      name: data.name,
      writtenOn: data.writtenOn,
      author: data.author,
      genres: data.genres,
    });
  }
}

import { AuthorId } from 'library-api/src/entities';
import { AuthorModel, PlainAuthorModel } from 'library-api/src/models';
// eslint-disable-next-line import/no-cycle
import { BookPresenter, PlainBookPresenter } from '../books/book.presenter';
// eslint-disable-next-line import/no-cycle
import { ImagePresenter, PlainImagePresenter } from '../images/image.presenter';
import { ApiProperty } from "@nestjs/swagger";

export class PlainAuthorPresenter {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  id: AuthorId;

  @ApiProperty({
    type: 'string',
  })
  firstName: string;

  @ApiProperty({
    type: 'string',
  })
  lastName: string;

  photo?: PlainImagePresenter;

  books?: PlainBookPresenter[];

  private constructor(data: PlainAuthorPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainAuthorModel): PlainAuthorPresenter {
    return new PlainAuthorPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      photo: data.photo,
      books: data.books,
    });
  }
}

export class AuthorPresenter {
  id: AuthorId;

  firstName: string;

  lastName: string;

  photo?: ImagePresenter;

  books?: BookPresenter[];

  private constructor(data: AuthorPresenter) {
    Object.assign(this, data);
  }

  public static from(data: AuthorModel): AuthorPresenter {
    return new AuthorPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      photo: data.photo,
      books: data.books?.map(BookPresenter.from),
    });
  }
}

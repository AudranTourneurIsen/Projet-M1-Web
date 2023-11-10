import { AuthorId } from 'library-api/src/entities';
import { AuthorModel, PlainAuthorModel } from 'library-api/src/models';
import { ApiProperty } from '@nestjs/swagger';
import { BookPresenter } from '../books/book.presenter';
import type { PlainBookPresenter } from '../books/book.presenter';
import type {
  ImagePresenter,
  PlainImagePresenter,
} from '../images/image.presenter';

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

  @ApiProperty({
    type: 'object',
  })
  photo?: PlainImagePresenter;

  @ApiProperty({
    type: 'object',
  })
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

  @ApiProperty({
    type: 'object',
  })
  photo?: ImagePresenter;

  @ApiProperty({
    type: 'object',
  })
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

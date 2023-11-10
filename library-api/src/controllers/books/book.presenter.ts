import type {
  AuthorPresenter,
  PlainAuthorPresenter,
} from 'library-api/src/controllers/authors/author.presenter';
import {
  GenrePresenter,
  PlainGenrePresenter,
} from 'library-api/src/controllers/genres/genre.presenter';
import { BookId } from 'library-api/src/entities';
import { BookModel, PlainBookModel } from 'library-api/src/models';
import { ApiProperty } from '@nestjs/swagger';

export class PlainBookPresenter {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  id: BookId;

  @ApiProperty({
    type: 'string',
  })
  name: string;

  writtenOn: Date;

  author: PlainAuthorPresenter;

  @ApiProperty({
    type: 'string',
  })
  genres: PlainGenrePresenter[];

  private constructor(data: PlainBookPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainBookModel): PlainBookPresenter {
    return new PlainBookPresenter({
      id: data.id,
      name: data.name,
      genres: data.genres,
      writtenOn: data.writtenOn,
      author: data.author,
    });
  }
}

export class BookPresenter {
  id: BookId;

  name: string;

  author: AuthorPresenter;

  writtenOn: Date;

  genres: GenrePresenter[];

  private constructor(data: BookPresenter) {
    Object.assign(this, data);
  }

  public static from(data: BookModel): BookPresenter {
    return new BookPresenter({
      id: data.id,
      name: data.name,
      writtenOn: data.writtenOn,
      author: data.author,
      genres: data.genres,
    });
  }
}

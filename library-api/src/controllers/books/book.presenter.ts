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
import type {
  CommentPresenter,
  PlainCommentPresenter,
} from '../comments/comment.presenter';
import type { UserPresenter } from '../users/user.presenter';

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

  @ApiProperty({
    type: 'object',
  })
  writtenOn: Date;

  @ApiProperty({
    type: 'object',
  })
  author: PlainAuthorPresenter;

  @ApiProperty({
    type: 'object',
  })
  genres: PlainGenrePresenter[];

  @ApiProperty({
    type: 'object',
  })
  comments?: PlainCommentPresenter[];

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
      comments: data.comments,
    });
  }
}

export class BookPresenter {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  id: BookId;

  @ApiProperty({
    type: 'string',
  })
  name: string;

  @ApiProperty({
    type: 'object',
  })
  author: AuthorPresenter;

  @ApiProperty({
    type: 'object',
  })
  writtenOn: Date;

  @ApiProperty({
    type: 'object',
  })
  genres: GenrePresenter[];

  @ApiProperty({
    type: 'object',
  })
  comments?: CommentPresenter[];

  @ApiProperty({
    type: 'object',
  })
  ownedByUsers?: UserPresenter[];

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
      comments: data.comments,
      ownedByUsers: data.ownedByUsers,
    });
  }
}

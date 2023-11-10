import { CommentId } from 'library-api/src/entities';
import { CommentModel, PlainCommentModel } from 'library-api/src/models';
import { ApiProperty } from '@nestjs/swagger';
import { PlainUserPresenter, UserPresenter } from '../users/user.presenter';

export class PlainCommentPresenter {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  id: CommentId;

  @ApiProperty({
    type: 'string',
  })
  text: string;

  writtenOn: Date;

  user: PlainUserPresenter;

  private constructor(data: PlainCommentPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainCommentModel): PlainCommentPresenter {
    return new PlainCommentPresenter({
      id: data.id,
      text: data.text,
      writtenOn: data.writtenOn,
      user: data.user,
    });
  }
}

export class CommentPresenter {
  id: CommentId;

  text: string;

  user: UserPresenter;

  writtenOn: Date;

  private constructor(data: CommentPresenter) {
    Object.assign(this, data);
  }

  public static from(data: CommentModel): CommentPresenter {
    return new CommentPresenter({
      id: data.id,
      text: data.text,
      writtenOn: data.writtenOn,
      user: data.user,
    });
  }
}

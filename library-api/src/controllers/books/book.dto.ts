import { IsDate, IsArray, IsString } from 'class-validator';
import {
  GenreModel,
  PlainAuthorModel,
  PlainCommentModel,
} from 'library-api/src/models';

export class CreateBookDto {
  @IsString()
  name: string;

  @IsDate()
  writtenOn: Date;

  @IsString()
  authorId: PlainAuthorModel['id'];

  @IsArray()
  genres: GenreModel[];
}

export class CreateCommentDto {
  @IsString()
  text: string;

  @IsString()
  id: PlainCommentModel['id'];

  @IsString()
  userId: PlainCommentModel['user']['id'];

  @IsDate()
  writtenOn: Date;
}

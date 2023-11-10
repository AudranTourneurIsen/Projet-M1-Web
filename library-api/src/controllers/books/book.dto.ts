import { IsDate, IsArray, IsString } from 'class-validator';
import {
  GenreModel,
  PlainAuthorModel,
  PlainCommentModel,
} from 'library-api/src/models';

export class CreateBookDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: 'date',
  })
  @IsDate()
  writtenOn: Date;

  @ApiProperty({
    type: 'class',
  })
  @IsString()
  authorId: PlainAuthorModel['id'];

  @ApiProperty({
    type: 'class',
  })
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

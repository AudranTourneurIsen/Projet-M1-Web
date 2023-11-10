import { IsDate, IsArray, IsString } from 'class-validator';
import {
  GenreModel,
  PlainAuthorModel,
  PlainCommentModel,
} from 'library-api/src/models';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: 'object',
  })
  @IsDate()
  writtenOn: Date;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  authorId: PlainAuthorModel['id'];

  @ApiProperty({
    type: 'array',
  })
  @IsArray()
  genres: GenreModel[];
}

export class CreateCommentDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  text: string;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  id: PlainCommentModel['id'];

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  userId: PlainCommentModel['user']['id'];
}

import { IsDate, IsArray, IsString } from 'class-validator';
import { PlainAuthorModel } from 'library-api/src/models';

export class CreateBookDto {
  @IsString()
  name: string;

  @IsDate()
  writtenOn: Date;

  author: PlainAuthorModel;

  @IsArray()
  genres: string[];
}

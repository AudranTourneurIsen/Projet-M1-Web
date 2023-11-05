import { IsDate, IsArray, IsString } from 'class-validator';
import { GenreModel, PlainAuthorModel } from 'library-api/src/models';

export class CreateBookDto {
  @IsString()
  name: string;

  @IsDate()
  writtenOn: Date;

  author: PlainAuthorModel;

  @IsArray()
  genres: GenreModel[];
}

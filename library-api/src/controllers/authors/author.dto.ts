import { IsString } from 'class-validator';
import { AuthorId, BookId } from '../../entities';

export class CreateAuthorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class EditAuthorDto {
  @IsString()
  id: AuthorId;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString({ each: true })
  bookIds: BookId[];
}

export class EditAuthorImageDto {
  @IsString()
  id: AuthorId;
}

import { IsString } from 'class-validator';
import { AuthorId } from '../../entities';

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
}

export class EditAuthorImageDto {
  @IsString()
  id: AuthorId;
}

export class DeleteAuthorDto {
  @IsString()
  id: AuthorId;
}

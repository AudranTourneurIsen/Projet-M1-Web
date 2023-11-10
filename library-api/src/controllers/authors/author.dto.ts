import { IsString } from 'class-validator';
import { AuthorId, BookId } from '../../entities';
import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthorDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  lastName: string;
}

export class EditAuthorDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'author id'
  })
  @IsString()
  id: AuthorId;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    type: 'string',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  @IsString({ each: true })
  bookIds: BookId[];
}

export class EditAuthorImageDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'author id'
  })
  @IsString()
  id: AuthorId;
}

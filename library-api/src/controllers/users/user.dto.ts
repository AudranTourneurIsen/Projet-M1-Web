import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BookId, GenreId, UserId } from '../../entities';

export class CreateUserDto {
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

export class EditUserFavoriteBookDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  @IsString()
  bookId: BookId;
}

export class EditUserFavoriteGenresDto {
  @ApiProperty({
    type: 'string',
  })
  @IsString({ each: true })
  genreIds: GenreId[];
}

export class EditUserOwnedBooksDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  @IsString({ each: true })
  bookIds: BookId[];
}

export class EditUserFriendsDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  @IsString({ each: true })
  userIds: UserId[];
}

import { IsString } from 'class-validator';
import { BookId, GenreId, UserId } from '../../entities';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class EditUserFavoriteBookDto {
  @IsString()
  bookId: BookId;
}

export class EditUserFavoriteGenresDto {
  @IsString({ each: true })
  genreIds: GenreId[];
}

export class EditUserOwnedBooksDto {
  @IsString({ each: true })
  bookIds: BookId[];
}

export class EditUserFriendsDto {
  @IsString({ each: true })
  userIds: UserId[];
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import {
  UserPresenter,
  PlainUserPresenter,
} from 'library-api/src/controllers/users/user.presenter';
import { BookId, GenreId, UserId } from 'library-api/src/entities';
import { UserUseCases } from 'library-api/src/useCases';
import {
  CreateUserDto,
  EditUserFavoriteBookDto,
  EditUserFavoriteGenresDto,
  EditUserFriendsDto,
  EditUserOwnedBooksDto,
} from './user.dto';
import { resolveItunes } from 'next/dist/lib/metadata/resolvers/resolve-basics';

@Controller('users')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainUserPresenter[]> {
    const users = await this.userUseCases.getAllPlain();

    return users.map(PlainUserPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: UserId): Promise<UserPresenter> {
    const user = await this.userUseCases.getById(id);

    return UserPresenter.from(user);
  }

  @Post('/new')
  public async createUser(@Body() user: CreateUserDto): Promise<UserPresenter> {
    const createdUser = await this.userUseCases.createUser(user);

    return UserPresenter.from(createdUser);
  }

  @Post('/:id/edit-favorite-book')
  public async editFavoriteBook(
    @Param('id') userId: UserId,
    @Body() editUserFavoriteBookDto: EditUserFavoriteBookDto,
  ): Promise<UserPresenter> {
    Logger.log(`editFavoriteBook: ${userId} ${editUserFavoriteBookDto.bookId}`);
    const editedUser = await this.userUseCases.editFavoriteBook(
      userId,
      editUserFavoriteBookDto.bookId,
    );

    return UserPresenter.from(editedUser);
  }

  @Post('/:id/edit-favorite-genres')
  public async editFavoriteGenres(
    @Param('id') userId: UserId,
    @Body() editUserFavoriteGenresDto: EditUserFavoriteGenresDto,
  ): Promise<UserPresenter> {
    const editedUser = await this.userUseCases.editFavoriteGenres(
      userId,
      editUserFavoriteGenresDto.genreIds,
    );

    return UserPresenter.from(editedUser);
  }

  @Post('/:id/edit-owned-books')
  public async editOwnedBooks(
    @Param('id') userId: UserId,
    @Body() editUserOwnedBooksDto: EditUserOwnedBooksDto,
  ): Promise<UserPresenter> {
    const editedUser = await this.userUseCases.editOwnedBooks(
      userId,
      editUserOwnedBooksDto.bookIds,
    );

    return UserPresenter.from(editedUser);
  }

  @Post('/:id/edit-friends')
  public async editFriends(
    @Param('id') userId: UserId,
    @Body() editUserFriendsDto: EditUserFriendsDto,
  ): Promise<UserPresenter> {
    Logger.log(`editFriends: ${userId} ${editUserFriendsDto.userIds}`);
    const editedUser = await this.userUseCases.editFriends(
      userId,
      editUserFriendsDto.userIds,
    );

    return UserPresenter.from(editedUser);
  }

  @Delete('/:id/delete')
  public async deleteUser(@Param('id') userId: UserId): Promise<void> {
    await this.userUseCases.deleteUser(userId);
  }
}

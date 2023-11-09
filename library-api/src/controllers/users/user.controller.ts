import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  UserPresenter,
  PlainUserPresenter,
} from 'library-api/src/controllers/users/user.presenter';
import { BookId, GenreId, UserId } from 'library-api/src/entities';
import { UserUseCases } from 'library-api/src/useCases';
import { CreateUserDto } from './user.dto';

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
    @Body() bookId: BookId,
  ): Promise<UserPresenter> {
    const editedUser = await this.userUseCases.editFavoriteBook(userId, bookId);

    return UserPresenter.from(editedUser);
  }

  @Post('/:id/edit-favorite-genres')
  public async editFavoriteGenres(
    @Param('id') userId: UserId,
    @Body() genresIds: GenreId[],
  ): Promise<UserPresenter> {
    const editedUser = await this.userUseCases.editFavoriteGenres(
      userId,
      genresIds,
    );

    return UserPresenter.from(editedUser);
  }

  @Post('/:id/edit-owned-books')
  public async editOwnedBooks(
    @Param('id') userId: UserId,
    @Body() books: BookId[],
  ): Promise<UserPresenter> {
    const editedUser = await this.userUseCases.editOwnedBooks(userId, books);

    return UserPresenter.from(editedUser);
  }

  @Post('/:id/edit-friends')
  public async editFriends(
    @Param('id') userId: UserId,
    @Body() friends: UserId[],
  ): Promise<UserPresenter> {
    const editedUser = await this.userUseCases.editFriends(userId, friends);

    return UserPresenter.from(editedUser);
  }

  @Delete('/:id/delete')
  public async deleteUser(@Param('id') userId: UserId): Promise<void> {
    await this.userUseCases.deleteUser(userId);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  UserPresenter,
  PlainUserPresenter,
} from 'library-api/src/controllers/users/user.presenter';
import { UserId } from 'library-api/src/entities';
import { UserUseCases } from 'library-api/src/useCases';
import {
  CreateUserDto,
  EditUserFavoriteBookDto,
  EditUserFavoriteGenresDto,
  EditUserFriendsDto,
  EditUserOwnedBooksDto,
} from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @ApiOkResponse({
    description: 'Get all users',
    type: PlainUserPresenter,
    isArray: true,
  })
  @Get('/')
  public async getAll(): Promise<PlainUserPresenter[]> {
    const users = await this.userUseCases.getAllPlain();

    return users.map(PlainUserPresenter.from);
  }

  @ApiOkResponse({
    description: 'Get user by id',
    type: UserPresenter,
    isArray: true,
  })
  @Get('/:id')
  public async getById(@Param('id') id: UserId): Promise<UserPresenter> {
    const user = await this.userUseCases.getById(id);

    return UserPresenter.from(user);
  }

  @ApiOkResponse({
    description: 'create a new user',
    type: UserPresenter,
    isArray: true,
  })
  @Post('/new')
  public async createUser(@Body() user: CreateUserDto): Promise<UserPresenter> {
    const createdUser = await this.userUseCases.createUser(user);

    return UserPresenter.from(createdUser);
  }

  @ApiOkResponse({
    description: 'edit favorite book of the user',
    type: UserPresenter,
    isArray: true,
  })
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

  @ApiOkResponse({
    description: 'edit favorite genres of the user',
    type: UserPresenter,
    isArray: true,
  })
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

  @ApiOkResponse({
    description: 'edit owned books of the user',
    type: UserPresenter,
    isArray: true,
  })
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

  @ApiOkResponse({
    description: 'edit friends list of the user',
    type: UserPresenter,
    isArray: true,
  })
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

  @ApiOkResponse({
    description: 'delete the user',
    type: UserPresenter,
    isArray: true,
  })
  @Delete('/:id/delete')
  public async deleteUser(@Param('id') userId: UserId): Promise<void> {
    await this.userUseCases.deleteUser(userId);
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  UserPresenter,
  PlainUserPresenter,
} from 'library-api/src/controllers/users/user.presenter';
import { UserId } from 'library-api/src/entities';
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
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthorId } from 'library-api/src/entities';
import { AuthorUseCases } from 'library-api/src/useCases';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { AuthorPresenter, PlainAuthorPresenter } from './author.presenter';
import {
  CreateAuthorDto,
  EditAuthorDto,
  EditAuthorImageDto,
} from './author.dto';

@ApiTags('authors')
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorUseCases: AuthorUseCases) {}

  @ApiOkResponse({
    description: 'Get all authors',
    type: PlainAuthorPresenter,
    isArray: true,
  })
  @Get('/')
  public async getAll(): Promise<PlainAuthorPresenter[]> {
    const authors = await this.authorUseCases.getAllPlain();

    return authors.map(PlainAuthorPresenter.from);
  }

  @ApiOkResponse({
    description: 'Get author by id',
    type: AuthorPresenter,
    isArray: true,
  })
  @Get('/:id')
  public async getById(@Param('id') id: AuthorId): Promise<AuthorPresenter> {
    const author = await this.authorUseCases.getById(id);

    return AuthorPresenter.from(author);
  }

  @ApiOkResponse({
    description: 'Create a new author, the file must be uploaded as multiform input in the same request',
    isArray: true,
  })
  @Post('/new')
  @UseInterceptors(FileInterceptor('image'))
  public async createAuthor(
    @UploadedFile() file: Express.Multer.File,
    @Body() author: CreateAuthorDto,
  ): Promise<AuthorPresenter> {
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      throw new Error('Invalid file type');
    }

    const createdAuthor = await this.authorUseCases.createAuthor(
      author,
      file.buffer,
    );

    return AuthorPresenter.from(createdAuthor);
  }

  @ApiOkResponse({
    description: 'edit an author',
    isArray: true,
  })
  @Post('/edit')
  public async editAuthor(
    @Body() author: EditAuthorDto,
  ): Promise<AuthorPresenter> {
    Logger.warn(
      `ICI auteur édité ; ${author.id} ${author.firstName} ${author.lastName}`,
      author,
    );

    const editedAuthor = await this.authorUseCases.editAuthor(author);

    return AuthorPresenter.from(editedAuthor);
  }

  @ApiOkResponse({
    description: 'edit a image: the new image must be uploaded as multiform input in the request',
    isArray: true,
  })
  @Post('/edit/image')
  @UseInterceptors(FileInterceptor('image'))
  public async editAuthorImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() author: EditAuthorImageDto,
  ): Promise<void> {
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      throw new Error('Invalid file type');
    }

    await this.authorUseCases.editAuthorImage(author, file.buffer);
  }

  @ApiOkResponse({
    description: 'Delete the author by using is id',
    isArray: true,
  })
  @Delete('/delete/:id')
  public async deleteAuthor(@Param('id') id: AuthorId): Promise<void> {
    await this.authorUseCases.deleteAuthor(id);
  }
}

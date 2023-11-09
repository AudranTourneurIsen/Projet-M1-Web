import { Injectable } from '@nestjs/common';
import { AuthorRepository } from 'library-api/src/repositories';
import { AuthorId } from 'library-api/src/entities';
import { ImageRepository } from 'library-api/src/repositories/images/image.repository';
import {
  CreateImageRepositoryInput,
  EditImageRepositoryInput,
} from 'library-api/src/repositories/images/image.repository.type';
import {
  CreateAuthorRepositoryInput,
  EditAuthorRepositoryInput,
} from 'library-api/src/repositories/authors/author.repository.type';
import {
  AuthorUseCasesOutput,
  CreateAuthorUseCasesInput,
  PlainAuthorUseCasesOutput,
  EditAuthorUseCasesInput,
  EditAuthorImageUseCasesInput,
} from 'library-api/src/useCases/authors/author.useCases.type';

@Injectable()
export class AuthorUseCases {
  constructor(
    private readonly authorRepository: AuthorRepository,
    private readonly imageRepository: ImageRepository,
  ) {}

  /**
   * Get all plain authors
   * @returns Array of plain authors
   */
  public async getAllPlain(): Promise<PlainAuthorUseCasesOutput[]> {
    return this.authorRepository.getAllPlain();
  }

  /**
   * Get a author by its ID
   * @param id Author's ID
   * @returns Author if found
   * @throws 404: author with this ID was not found
   */
  public async getById(id: AuthorId): Promise<AuthorUseCasesOutput> {
    return this.authorRepository.getById(id);
  }

  /**
   * Create a new author
   * @param author Author to create
   * @returns Created author
   */
  public async createAuthor(
    author: CreateAuthorUseCasesInput,
    imageBuffer: Buffer,
  ): Promise<AuthorUseCasesOutput> {
    const imageInput: CreateImageRepositoryInput = {
      image: imageBuffer.toString('base64'),
    };

    const image = await this.imageRepository.createImage(imageInput);

    const authorInput: CreateAuthorRepositoryInput = {
      ...author,
      photo: image,
    };

    return this.authorRepository.createAuthor(authorInput);
  }

  /**
   * Edit an author
   * @param author Author to edit
   * @returns Edited author
   */

  public async editAuthor(
    author: EditAuthorUseCasesInput,
  ): Promise<AuthorUseCasesOutput> {
    const authorInput: EditAuthorRepositoryInput = {
      ...author,
    };
    return this.authorRepository.editAuthor(authorInput);
  }

  public async editAuthorImage(
    authorBase: EditAuthorImageUseCasesInput,
    imageBuffer: Buffer,
  ) {
    const authorId = authorBase.id;

    const author = await this.getById(authorId);

    const imageId = author.photo.id;

    const imageInput: EditImageRepositoryInput = {
      id: imageId,
      image: imageBuffer.toString('base64'),
    };

    this.imageRepository.editImage(imageInput);
  }

  
  /**
   * Delete an author
   * @param id Author's ID
   * @throws 404: author with this ID was not found
   */

  public async deleteAuthor(id: string): Promise<void> {
    await this.authorRepository.deleteAuthor(id);
  }
}

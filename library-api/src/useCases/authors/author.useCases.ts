import { Injectable } from '@nestjs/common';
import { AuthorRepository } from 'library-api/src/repositories';
import { AuthorId } from 'library-api/src/entities';
import { ImageRepository } from 'library-api/src/repositories/images/image.repository';
import { CreateImageRepositoryInput } from 'library-api/src/repositories/images/image.repository.type';
import { CreateAuthorRepositoryInput } from 'library-api/src/repositories/authors/author.repository.type';
import {
  AuthorUseCasesOutput,
  CreateAuthorUseCasesInput,
  PlainAuthorUseCasesOutput,
} from './author.useCases.type';

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
      image,
    };

    return this.authorRepository.createAuthor(authorInput);
  }
}

import { Injectable } from '@nestjs/common';
import { Author, AuthorId } from 'library-api/src/entities';
import { DataSource, Repository } from 'typeorm';
import { NotFoundError } from 'library-api/src/common/errors';
import {
  AuthorRepositoryOutput,
  CreateAuthorRepositoryInput,
  PlainAuthorRepositoryOutput,
  EditAuthorRepositoryInput,
} from './author.repository.type';
import {
  adaptAuthorEntityToAuthorModel,
  adaptAuthorEntityToPlainAuthorModel,
} from './author.utils';

@Injectable()
export class AuthorRepository extends Repository<Author> {
  constructor(public readonly dataSource: DataSource) {
    super(Author, dataSource.createEntityManager());
  }

  /**
   * Get all plain authors
   * @returns Array of plain authors
   */
  public async getAllPlain(): Promise<PlainAuthorRepositoryOutput[]> {
    const authors = await this.find({
      relations: { books: { genres: true }, photo: true },
    });

    return authors.map(adaptAuthorEntityToPlainAuthorModel);
  }

  /**
   * Get a author by its ID
   * @param id Author's ID
   * @returns Author if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: AuthorId): Promise<AuthorRepositoryOutput> {
    const author = await this.findOne({
      relations: { photo: true, books: { genres: true } },
      where: { id },
    });

    if (!author) {
      throw new NotFoundError(`Author - '${id}'`);
    }

    return adaptAuthorEntityToAuthorModel(author);
  }

  /**
   * Create a new author
   * @param author Author to create
   * @returns Created author
   */
  public async createAuthor(
    author: CreateAuthorRepositoryInput,
  ): Promise<AuthorRepositoryOutput> {
    const createdAuthor = await this.save(author);

    return adaptAuthorEntityToAuthorModel(createdAuthor);
  }

  /**
   * Edit an existing author
   * @param author Author to edit
   * @returns Edited author
   */

  public async editAuthor(
    author: EditAuthorRepositoryInput,
  ): Promise<AuthorRepositoryOutput> {
    const editedAuthor = await this.save(author);
    return adaptAuthorEntityToAuthorModel(editedAuthor);
  }

  /**
   * Delete an existing author
   * @param id Author's ID
   */

  public async deleteAuthor(id: string): Promise<void> {
    await this.delete(id);
  }
}

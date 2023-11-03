import { Injectable } from '@nestjs/common';
import { Author, AuthorId } from 'library-api/src/entities';
import { DataSource, Repository } from 'typeorm';
import { NotFoundError } from 'library-api/src/common/errors';
import {
  AuthorRepositoryOutput,
  PlainAuthorRepositoryOutput,
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
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<PlainAuthorRepositoryOutput[]> {
    const books = await this.find({
      relations: { books: { bookGenres: true } },
    });

    return books.map(adaptAuthorEntityToPlainAuthorModel);
  }

  /**
   * Get a book by its ID
   * @param id Author's ID
   * @returns Author if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: AuthorId): Promise<AuthorRepositoryOutput> {
    const book = await this.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundError(`Author - '${id}'`);
    }

    return adaptAuthorEntityToAuthorModel(book);
  }

  /**
   * Create a new author
   * @param author Author to create
   * @returns Created author
   */
  public async createAuthor(
    author: AuthorRepositoryOutput,
  ): Promise<AuthorRepositoryOutput> {
    const createdAuthor = await this.save(author);
    return adaptAuthorEntityToAuthorModel(createdAuthor);
  }
}

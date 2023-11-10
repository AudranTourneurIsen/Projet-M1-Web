import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'library-api/src/common/errors';
import { Book, BookId } from 'library-api/src/entities';
import {
  BookRepositoryOutput,
  CreateBookRepositoryInput,
  PlainBookRepositoryOutput,
} from 'library-api/src/repositories/books/book.repository.type';
import {
  adaptBookEntityToBookModel,
  adaptBookEntityToPlainBookModel,
} from 'library-api/src/repositories/books/book.utils';
import { DataSource, In, Repository } from 'typeorm';

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(public readonly dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<PlainBookRepositoryOutput[]> {
    const books = await this.find({
      relations: { genres: true, author: true },
    });

    return books.map(adaptBookEntityToPlainBookModel);
  }

  /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: BookId): Promise<BookRepositoryOutput> {
    const book = await this.findOne({
      where: { id },
      relations: {
        genres: true,
        author: { books: true, photo: true },
        comments: { user: true },
        ownedByUsers: true,
      },
    });

    if (!book) {
      throw new NotFoundError(`Book - '${id}'`);
    }

    return adaptBookEntityToBookModel(book);
  }

  /**
   * Create a new book
   * @param book Book to create
   * @returns Created book
   */
  public async createBook(
    book: CreateBookRepositoryInput,
  ): Promise<BookRepositoryOutput> {
    const createdBook = await this.save(book);

    return adaptBookEntityToBookModel(createdBook);
  }

  /**
   * Get books by their IDs
   * @param ids Books' IDs
   * @returns Books if found
   */

  public async getByIds(ids: BookId[]): Promise<BookRepositoryOutput[]> {
    const books = await this.find({ where: { id: In(ids) } });

    return books.map(adaptBookEntityToBookModel);
  }

  /**
   * Delete a book
   * @param id Book's ID
   */

  public async deleteBook(id: BookId): Promise<void> {
    await this.delete(id);
  }
}

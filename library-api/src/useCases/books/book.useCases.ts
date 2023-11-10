import { Injectable, Logger } from '@nestjs/common';
import { Comment, Author, Book, BookId, Genre } from 'library-api/src/entities';
import {
  AuthorRepository,
  BookRepository,
  GenreRepository,
} from 'library-api/src/repositories';
import {
  BookUseCasesOutput,
  CreateBookUseCasesInput,
  CreateCommentUseCasesInput,
  PlainBookUseCasesOutput,
} from 'library-api/src/useCases/books/book.useCases.type';

@Injectable()
export class BookUseCases {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly genreRepository: GenreRepository,
    private readonly authorRepository: AuthorRepository,
  ) {}

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<PlainBookUseCasesOutput[]> {
    return this.bookRepository.getAllPlain();
  }

  /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: BookId): Promise<BookUseCasesOutput> {
    return this.bookRepository.getById(id);
  }

  /**
   * Create a new book
   * @param book Book to create
   * @returns Created book
   */
  public async createBook(
    book: CreateBookUseCasesInput,
  ): Promise<BookUseCasesOutput> {
    const genresIDs = book.genres.map(({ id }) => id);

    const genres = await this.genreRepository.getByIds(genresIDs);

    const author = await this.authorRepository.getById(book.authorId);

    if (!author) {
      throw new Error('Author not found');
    }

    const authorTmp = new Author();
    authorTmp.id = author.id;
    authorTmp.firstName = author.firstName;
    authorTmp.lastName = author.lastName;

    const bookToSend = new Book();
    bookToSend.author = authorTmp;
    bookToSend.name = book.name;
    bookToSend.writtenOn = book.writtenOn;
    bookToSend.genres = [];
    genres.forEach((genre) => {
      const genreTmp = new Genre();
      genreTmp.id = genre.id;
      genreTmp.name = genre.name;
      bookToSend.genres.push(genreTmp);
    });

    Logger.log('bookToSend', JSON.stringify(bookToSend));

    return this.bookRepository.createBook(bookToSend);
  }

  /**
   * Delete a book
   * @param id Book's ID
   * @throws 404: book with this ID was not found
   */

  public async deleteBook(id: BookId): Promise<void> {
    const book = await this.bookRepository.getById(id);

    if (!book) {
      throw new Error('Book not found');
    }

    return this.bookRepository.deleteBook(id);
  }

  /**
   * Add a comment to a book
   * @param id Book's ID
   * @param comment Comment to add
   * @returns Book with the new comment
   * @throws 404: book with this ID was not found
   */

  public async addComment(
    id: BookId,
    comment: CreateCommentUseCasesInput,
  ): Promise<BookUseCasesOutput> {
    const book = await this.bookRepository.getById(id);

    if (!book) {
      throw new Error('Book not found');
    }

    const commentTmp = new Comment();

    return book;
  }

  /**
   * Get all comments of a book
   * @param id Book's ID
   * @returns Book with its comments
   * @throws 404: book with this ID was not found
   */

  public async getComments(id: BookId): Promise<BookUseCasesOutput> {
    const book = await this.bookRepository.getById(id);

    if (!book) {
      throw new Error('Book not found');
    }

    return book;
  }
}

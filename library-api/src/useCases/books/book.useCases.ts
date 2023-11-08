import { Injectable } from '@nestjs/common';
import { Author, Book, BookId, Genre } from 'library-api/src/entities';
import {
  AuthorRepository,
  BookRepository,
  GenreRepository,
} from 'library-api/src/repositories';
import {
  BookUseCasesOutput,
  CreateBookUseCasesInput,
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

    if (!book.author) {
      throw new Error('all fields are required');
    }

    const author = await this.authorRepository.getById(book.author.id);

    if (!author) {
      throw new Error('Author not found');
    }

    const authorToSave = new Author();
    authorToSave.id = author.id;
    authorToSave.firstName = author.firstName;
    authorToSave.lastName = author.lastName;

    const bookToSend = new Book();
    bookToSend.name = book.name;
    bookToSend.author = authorToSave;
    bookToSend.writtenOn = book.writtenOn;
    bookToSend.genres = [];
    genres.forEach((genre) => {
      const genreTmp = new Genre();
      genreTmp.id = genre.id;
      genreTmp.name = genre.name;
      bookToSend.genres.push(genreTmp);
    });

    return this.bookRepository.createBook(book);
  }
}

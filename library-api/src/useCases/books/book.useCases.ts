import { Injectable, Logger } from '@nestjs/common';
import {
  Comment,
  Author,
  Book,
  BookId,
  Genre,
  User,
} from 'library-api/src/entities';
import {
  AuthorRepository,
  BookRepository,
  GenreRepository,
  UserRepository,
} from 'library-api/src/repositories';
import { CommentRepository } from 'library-api/src/repositories/comments/comment.repository';
import {
  BookUseCasesOutput,
  CreateBookUseCasesInput,
  CreateCommentUseCasesInput,
  CreateCommentUseCasesOutput,
  PlainBookUseCasesOutput,
} from 'library-api/src/useCases/books/book.useCases.type';

@Injectable()
export class BookUseCases {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly bookRepository: BookRepository,
    private readonly genreRepository: GenreRepository,
    private readonly authorRepository: AuthorRepository,
    private readonly userRepository: UserRepository,
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
  ): Promise<CreateCommentUseCasesOutput> {
    const book = await this.bookRepository.getById(id);

    if (!book) {
      throw new Error('Book not found');
    }

    const user = await this.userRepository.getById(comment.userId);

    if (!user) {
      throw new Error('User not found');
    }

    const userTmp = new User();
    userTmp.id = user.id;

    const bookTmp = new Book();
    bookTmp.id = book.id;

    const commentTmp = new Comment();
    commentTmp.text = comment.text;
    commentTmp.writtenOn = comment.writtenOn;
    commentTmp.book = bookTmp;
    commentTmp.user = userTmp;

    return this.commentRepository.createComment(commentTmp);
  }
}

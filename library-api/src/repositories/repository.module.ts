import { Module } from '@nestjs/common';
import { AuthorRepository } from 'library-api/src/repositories/authors/author.repository';
import { BookRepository } from 'library-api/src/repositories/books/book.repository';
import { GenreRepository } from 'library-api/src/repositories/genres/genre.repository';
import { UserRepository } from 'library-api/src/repositories/users/user.repository';
import { ImageRepository } from './images/image.repository';
import { CommentRepository } from './comments/comment.repository';

const repositories = [
  AuthorRepository,
  BookRepository,
  GenreRepository,
  UserRepository,
  ImageRepository,
  CommentRepository,
];

@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}

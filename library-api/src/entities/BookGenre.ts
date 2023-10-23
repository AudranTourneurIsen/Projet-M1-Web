/* eslint-disable import/no-cycle */
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Genre } from './Genre';
import { Book } from './Book';

export type BookGenreId = string & { __brand: 'BookGenre' };

@Entity('BookGenres')
export class BookGenre extends BaseEntity {
  @PrimaryColumn()
  id: BookGenreId;

  @ManyToOne(() => Book, (book) => book.bookGenres, {
    onDelete: 'CASCADE',
  })
  book: Book;

  @ManyToOne(() => Genre, (genre) => genre.bookGenres, {
    onDelete: 'CASCADE',
  })
  genre: Genre;
}

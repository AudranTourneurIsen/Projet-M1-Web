/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookGenre } from './BookGenre';
import { Author } from './Author';
import { User } from './User';

export type BookId = string & { __brand: 'Book' };

@Entity('Books')
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: BookId;

  @Column()
  name: string;

  @Column({ type: 'date' })
  writtenOn: Date;

  @ManyToOne(() => Author, (author) => author.books, { onDelete: 'CASCADE' })
  author: Author;

  @ManyToMany(() => User, (user) => user.ownedBooks, { onDelete: 'CASCADE' })
  @JoinTable()
  ownedByUsers: User[];

  @OneToMany(() => User, (user) => user.favoriteBook, { onDelete: 'CASCADE' })
  inFavoriteBook: User;

  @OneToMany(() => BookGenre, (bookGenre) => bookGenre.book)
  bookGenres: BookGenre[];
}

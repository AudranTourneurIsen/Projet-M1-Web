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
import { Author } from './Author';
import { User } from './User';
import { Genre } from './Genre';
import { Comment } from './Comment';

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
  ownedByUsers: User[];

  @OneToMany(() => User, (user) => user.favoriteBook, { onDelete: 'CASCADE' })
  inFavoriteBook: User;

  @OneToMany(() => Comment, (comment) => comment.book, { onDelete: 'CASCADE' })
  @JoinTable()
  comments: Comment[];

  @ManyToMany(() => Genre, (genre) => genre.books)
  @JoinTable()
  genres: Genre[];
}

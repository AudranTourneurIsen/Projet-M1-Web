/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './Book';
import { Genre } from './Genre';

export type UserId = string & { __brand: 'User' };

@Entity('Users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UserId;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @ManyToMany(() => Book, (book) => book.ownedByUsers)
  @JoinTable()
  ownedBooks?: Book[];

  @ManyToOne(() => Book, (book) => book.inFavoriteBook)
  @JoinTable()
  favoriteBook?: Book;

  @ManyToMany(() => Genre, (genre) => genre.inFavoriteGenre)
  @JoinTable()
  favoriteGenres?: Genre[];

  @ManyToMany(() => User, (user) => user.friends)
  @JoinTable()
  // eslint-disable-next-line no-use-before-define
  friends?: User[];
}

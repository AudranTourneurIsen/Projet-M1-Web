/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './Book';
import { User } from './User';

export type GenreId = string & { __brand: 'Genre' };

@Entity('Genres')
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: GenreId;

  @Column()
  name: string;

  @ManyToMany(() => Book, (books) => books.genres)
  @JoinTable()
  books: Book[];

  @ManyToMany(() => User, (user) => user.favoriteGenres)
  inFavoriteGenre: User[];
}

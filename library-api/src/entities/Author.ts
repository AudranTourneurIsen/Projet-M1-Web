/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './Book';
import { Image } from './Image';

export type AuthorId = string & { __brand: 'Author' };

@Entity('Authors')
export class Author extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: AuthorId;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToOne(() => Image, (image) => image.author)
  photo?: Image;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}

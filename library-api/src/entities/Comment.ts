/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Book } from './Book';

export type CommentId = string & { __brand: 'Comment' };

@Entity('Comments')
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: CommentId;

  @Column({ type: 'date' })
  writtenOn: Date;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Book, (book) => book.comments, { onDelete: 'CASCADE' })
  book: Book;
}

/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

export type CommentId = string & { __brand: 'Comment' };

@Entity('Comments')
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: CommentId;

  @Column({ type: 'date' })
  writtenOn: Date;

  @Column()
  author: string;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user: User;
}

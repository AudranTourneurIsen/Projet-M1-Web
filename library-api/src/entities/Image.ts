/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from './Author';

export type ImageId = string & { __brand: 'Image' };

@Entity('Image')
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: ImageId;

  @Column()
  image: string;

  @OneToOne(() => Author, (author) => author.photo)
  author: Author;
}

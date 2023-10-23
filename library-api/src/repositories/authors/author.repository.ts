import { Injectable } from '@nestjs/common';
import { Author } from 'library-api/src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AuthorRepository extends Repository<Author> {
  constructor(public readonly dataSource: DataSource) {
    super(Author, dataSource.createEntityManager());
  }
}

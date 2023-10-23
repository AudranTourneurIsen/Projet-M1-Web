import { Injectable } from '@nestjs/common';
import { Genre } from 'library-api/src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class GenreRepository extends Repository<Genre> {
  constructor(public readonly dataSource: DataSource) {
    super(Genre, dataSource.createEntityManager());
  }
}

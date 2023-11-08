import { Module } from '@nestjs/common';
import { RepositoryModule } from 'library-api/src/repositories/repository.module';
import { AuthorUseCases, UserUseCases, GenreUseCases, BookUseCases } from '.';

const useCases = [AuthorUseCases, BookUseCases, GenreUseCases, UserUseCases];

@Module({
  imports: [RepositoryModule],
  providers: [...useCases],
  exports: [...useCases],
})
export class UseCasesModule {}

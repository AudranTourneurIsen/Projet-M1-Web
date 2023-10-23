import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'library-api/src/entities';
import { ControllerModule } from 'library-api/src/controllers/controller.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities,
      synchronize: true,
    }),
    ControllerModule,
  ],
})
export class AppModule {}

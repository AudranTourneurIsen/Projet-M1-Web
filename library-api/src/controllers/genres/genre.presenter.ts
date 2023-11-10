import { GenreId } from 'library-api/src/entities';
import { GenreModel } from 'library-api/src/models';
import { ApiProperty } from '@nestjs/swagger';

export class GenrePresenter {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  id: GenreId;

  @ApiProperty({
    type: 'string',
  })
  name: string;

  private constructor(data: GenrePresenter) {
    Object.assign(this, data);
  }

  public static from(data: GenreModel): GenrePresenter {
    return new GenrePresenter({
      id: data.id,
      name: data.name,
    });
  }
}

export class PlainGenrePresenter {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  id: GenreId;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  name: string;

  private constructor(data: PlainGenrePresenter) {
    Object.assign(this, data);
  }

  public static from(data: GenreModel): PlainGenrePresenter {
    return new PlainGenrePresenter({
      id: data.id,
      name: data.name,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { Image } from 'library-api/src/entities';
import { DataSource, Repository } from 'typeorm';
import { CreateImageRepositoryInput } from './image.repository.type';

@Injectable()
export class ImageRepository extends Repository<Image> {
  constructor(public readonly dataSource: DataSource) {
    super(Image, dataSource.createEntityManager());
  }

  /**
   * Create a new image
   * @param image Image to create
   * @returns Created image
   */
  public async createImage(image: CreateImageRepositoryInput): Promise<Image> {
    const createdImage = await this.save(image);

    return createdImage;
  }
}

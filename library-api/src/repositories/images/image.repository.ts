import { Injectable } from '@nestjs/common';
import { Image } from 'library-api/src/entities';
import { DataSource, Repository } from 'typeorm';
import {
  CreateImageRepositoryInput,
  EditImageRepositoryInput,
} from './image.repository.type';

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

  public async editImage(imageInput: EditImageRepositoryInput): Promise<Image> {
    const maybeImage = await this.findOneBy({
      id: imageInput.id,
    });

    if (maybeImage) {
      maybeImage.image = imageInput.image;
      return await this.save(maybeImage);
    } else {
      throw Error('Invalid image ID for: ' + imageInput.id);
    }
  }
}

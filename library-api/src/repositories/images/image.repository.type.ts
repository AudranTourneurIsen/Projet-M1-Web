import {
  ImageModel,
  PlainImageModel,
} from 'library-api/src/models/image.model';

export type PlainImageRepositoryOutput = PlainImageModel;
export type ImageRepositoryOutput = ImageModel;
export type CreateImageRepositoryInput = Omit<ImageModel, 'id'>;

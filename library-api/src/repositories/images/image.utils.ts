import { Image } from 'library-api/src/entities';
import {
  CreateImageRepositoryInput,
  ImageRepositoryOutput,
  PlainImageRepositoryOutput,
} from 'library-api/src/repositories/images/image.repository.type';

export const adaptImageEntityToPlainImageModel = (
  image: Image,
): PlainImageRepositoryOutput => ({
  ...image,
});

export const adaptImageEntityToImageModel = (
  image: Image,
): ImageRepositoryOutput => ({
  ...image,
});

export const adaptImageEntityToCreateImageRepositoryInput = (
  image: Image,
): CreateImageRepositoryInput => ({
  image: image.image,
});

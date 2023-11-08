import { ImageId } from 'library-api/src/entities';
import {
  ImageModel,
  PlainImageModel,
} from 'library-api/src/models/image.model';
import { PlainAuthorPresenter } from '../authors/author.presenter';

export class PlainImagePresenter {
  id: ImageId;

  image?: string;

  author?: PlainAuthorPresenter;

  private constructor(data: PlainImagePresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainImageModel): PlainImagePresenter {
    return new PlainImagePresenter({
      id: data.id,
      image: data.image,
      author: data.author,
    });
  }
}

export class ImagePresenter {
  id: ImageId;

  image?: string;

  author?: PlainAuthorPresenter;

  private constructor(data: ImagePresenter) {
    Object.assign(this, data);
  }

  public static from(data: ImageModel): ImagePresenter {
    return new ImagePresenter({
      id: data.id,
      image: data.image,
      author: data.author,
    });
  }
}

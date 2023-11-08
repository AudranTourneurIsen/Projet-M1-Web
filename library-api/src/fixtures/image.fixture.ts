import { faker } from '@faker-js/faker';
import { Image, ImageId } from 'library-api/src/entities';

export const imageFixture = (buffer: Buffer): Image =>
  ({
    id: faker.string.uuid() as ImageId,
    image: buffer.toString('base64'),
  }) as Image;

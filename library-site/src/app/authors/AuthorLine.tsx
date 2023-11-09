import React from 'react';
import { PlainAuthorModel } from '@/models';
import { Button } from '@/components/Button';

type AuthorLineProps = {
  author: PlainAuthorModel;
};

export function AuthorLine(props: AuthorLineProps): React.JSX.Element {
  const { author } = props;

  const imageRenderer = (imageURL: string): React.JSX.Element => {
    const fullBase64Src = `data:image/png;base64,${imageURL}`;
    return (
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src={fullBase64Src}
        alt=""
      />
    );
  };

  return (
    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-2">
      {author.photo ? (
        imageRenderer(author.photo?.image)
      ) : (
        <span>no photo available</span>
      )}
      <div className="flex flex-col justify-between p-4 leading-normal w-full">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {author.firstName} {author.lastName}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Wrote <span className="font-bold">{author.books?.length || 0}</span>{' '}
          books
        </p>

        <div className="flex justify-end">
          <div>
            <a href={`/authors/${author.id}`}>
              <Button color="success">More info</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

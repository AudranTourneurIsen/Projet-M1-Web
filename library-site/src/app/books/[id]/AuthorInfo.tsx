import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenFancy } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { PlainBookModel } from '@/models';

type AuthorInfoProps = {
  book: PlainBookModel;
};

export function AuthorInfo(props: AuthorInfoProps): React.JSX.Element {
  const { book } = props;

  const imageRenderer = (imageURL: string): React.JSX.Element => {
    const fullBase64Src = `data:image/png;base64,${imageURL}`;
    return (
      <Image
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src={fullBase64Src}
        alt=""
        width={200}
        height={200}
      />
    );
  };

  function getAuthorPhoto(): React.JSX.Element {
    if (book.author?.photo) {
      return imageRenderer(book.author.photo?.image);
    }
    return <span>No photo available</span>;
  }

  function getAuthorBooks(): React.JSX.Element {
    if (!book.author) {
      return <p>No author found...</p>;
    }
    return book.author.books?.length === 0 ? (
      <p>There is no known book from this author</p>
    ) : (
      <div>
        <p className="font-bold mt-2">Books by this author:</p>
        <ul className="list-disc ml-6">
          {book.author.books?.map((b) => <li key={b.id}>{b.name}</li>)}
        </ul>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <FontAwesomeIcon
          icon={faPenFancy}
          className="text-purple-500"
          size="xl"
        />
        About the author
      </div>
      <div className="border-gray-500 border-l-2 ml-2 pl-2 flex items-center">
        <div className="rounded-full overflow-hidden h-[50px] w-[50px] pb-1">
          {getAuthorPhoto()}
        </div>
        <div className="ml-2">
          <p className="font-bold">
            {book.author
              ? `The author of this book is ${book.author?.firstName} ${book.author?.lastName}`
              : `Sorry we can't find the author of this book...`}
          </p>
          <div className="ml-2">{getAuthorBooks()}</div>
        </div>
      </div>
    </div>
  );
}

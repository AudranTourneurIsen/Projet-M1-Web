import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faCircleInfo,
  faPenFancy,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { MultiSelectBlock } from '@/components/MultiSelectBlock';
import { PlainBookModel, PlainAuthorModel } from '@/models';
import axios from 'axios';
import { API_URL } from '@/utils/constants';

type AuthorInfoProps = {
  book: PlainBookModel;
  author: PlainAuthorModel;
};

export function AuthorInfo(props: AuthorInfoProps): React.JSX.Element {
  const { book, author } = props;

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
    <>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <FontAwesomeIcon
            icon={faPenFancy}
            className={'text-purple-500'}
            size={'xl'}
          />
          About the author
        </div>
        <div className="border-gray-500 border-l-2 ml-2 pl-2 flex items-center">
          <div className="rounded-full overflow-hidden h-[50px] w-[50px] pb-1">
            {book.author?.photo ? (
              book.author.photo ? (
                imageRenderer(book.author.photo?.image)
              ) : (
                <span>No photo available</span>
              )
            ) : (
              <span>No photo available</span>
            )}
          </div>
          <div className="ml-2">
            <p className="font-bold">
              {book.author
                ? `The author of this book is ${
                    book.author?.firstName + ' ' + book.author?.lastName
                  }`
                : `Sorry we can't find the author of this book...`}
            </p>
            <div className="ml-2">
              {book.author ? (
                book.author.books?.length === 0 ? (
                  <p>There is no known book from this author</p>
                ) : (
                  <div>
                    <p className="font-bold mt-2">Books by this author:</p>
                    <ul className="list-disc ml-6">
                      {book.author.books?.map((book) => (
                        <li key={book.id}>{book.name}</li>
                      ))}
                    </ul>
                  </div>
                )
              ) : (
                <p>No book found...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

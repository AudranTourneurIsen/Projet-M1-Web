'use client';

import { redirect, useParams } from 'next/navigation';
import React, { FC, useEffect } from 'react';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useBookProvider } from '@/hooks';
import { BookInfo } from '@/app/books/[id]/BookInfo';
import { AuthorInfo } from '@/app/books/[id]/AuthorInfo';
import { CommentSection } from '@/app/books/[id]/CommentSection';
import { BookSuppression } from '@/app/books/[id]/BookSuppression';

const BooksDetailsPage: FC = () => {
  const { id } = useParams();
  if (typeof id === 'object') {
    throw new Error('id should be a string');
  }
  const { useBook } = useBookProvider();
  const { book, loadBook } = useBook(id);

  if (!id) {
    redirect('/books');
  }

  useEffect(() => {
    loadBook();
    // Boucle infinie si on suit la règle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function reload(): void {
    loadBook();
  }

  if (!book) {
    return <p>Loading...</p>;
  }

  if (book === 'not found') {
    return redirect('/books');
  }
  return (
    <div className="flex flex-col">
      <div className="m-4 flex items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-semibold">
            <FontAwesomeIcon
              icon={faBook}
              className="text-grey-400"
              size="xl"
            />{' '}
            &nbsp; {book.name}
          </h1>
        </div>
      </div>
      <div className="flex flex-col m-6 gap-12 mx-auto">
        <BookInfo book={book} />
        <AuthorInfo book={book} />
        <CommentSection book={book} />
        <BookSuppression book={book} reload={(): void => reload()} />
      </div>
    </div>
  );
};

export default BooksDetailsPage;

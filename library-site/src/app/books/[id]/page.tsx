'use client';

import { redirect, useParams, useRouter } from 'next/navigation';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useBookProvider } from '@/hooks';
import {
  faBook,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BookInfo } from '@/app/books/[id]/BookInfo';
import {AuthorInfo} from "@/app/books/[id]/AuthorInfo";
import {CommentSection} from "@/app/books/[id]/CommentSection";
import {BookSuppression} from "@/app/books/[id]/BookSuppression";
const BooksDetailsPage: FC = () => {
  const { id } = useParams();
  const { useBook } = useBookProvider();
  const { book, loadBook } = useBook(id);


  if (!id || typeof id !== 'string') {
    redirect('/books');
  }

  useEffect(() => {
    loadBook();
  }, []);

  function reload() {
    loadBook();
  }

  if (!book) {
    return <p>Loading...</p>;
  }

  if (book === 'not found') {
    return redirect('/books');
  }
  return (
    <>
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


          <BookInfo book={book}/>
          <AuthorInfo book={book} author={book.author}/>
          <CommentSection book={book}/>
          <BookSuppression book={book} reload={(): void => reload()} />
        </div>
      </div>
    </>
  );
};

export default BooksDetailsPage;

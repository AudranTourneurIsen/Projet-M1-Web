'use client';

import { redirect, useParams } from 'next/navigation';
import { FC, useEffect } from 'react';
import { useBookProvider } from '@/hooks';

const BooksDetailsPage: FC = () => {
  const { id } = useParams();

  if (!id || typeof id !== 'string') {
    redirect('/books');
  }

  const { useBook } = useBookProvider();

  const { book, loadBook } = useBook(id);

  useEffect(() => {
    loadBook();
  }, []);

  useEffect(() => {}, [book]);

  if (!book) {
    return <p>Loading...</p>;
  }

  if (book === 'not found') {
    setTimeout(() => {
      redirect('/books');
    }, 3000);
    return <p>You are going to be redirected after a few seconds</p>;
  }

  function returnDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <div className="relative m-10 p-auto">
      <h1 className="text-2xl font-bold text-center">Book Details</h1>
      <div className="mt-5 grid gap-5 border rounded w-full">
        <div className="grid grid-cols-8">
          <h2 className="p-4">name :</h2>
          <h3 className="text-xl font-bold text-center col-span-3 p-4">
            {book.name}
          </h3>
          <h2 className="p-4">written on :</h2>
          <h3 className="text-l font-bold text-center col-span-3 p-4">
            {returnDate(book.writtenOn)}
          </h3>
        </div>
        <div className="grid grid-cols-6">
          <h2 className="p-4">author :</h2>
          <div className="col-span-5">
            {book.author ? (
              <>
                <p className="text-center">{book.author.firstName}</p>
                <p className="text-center">{book.author.lastName}</p>
                <p className="text-center">----------Images HERE----------</p>
              </>
            ) : (
              <p className="text-center">
                {' '}
                There is no know author to this book{' '}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-6">
          <h2 className="p-4">genres :</h2>
          <div className="col-span-5">
            {book.genres.length !== 0 ? (
              book.genres.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))
            ) : (
              <p className="text-center">
                {' '}
                There is no know genre to this book{' '}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksDetailsPage;

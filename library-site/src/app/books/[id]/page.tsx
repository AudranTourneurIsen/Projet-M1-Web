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

  if (!book) {
    return <p>Loading...</p>;
  }

  if (book === 'not found') {
    return redirect('/books');
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
      <div className="py-8 px-8 max-w-sm mx-auto bg-gray-500 rounded-xl shadow-lg space-y-2 sm:py-4 sm:items-center sm:space-y-0 sm:space-x-6">
        <h1 className="text-2xl font-bold text-center">Book Details</h1>
      </div>


      <div className="mt-5 grid gap-5 border rounded w-full">
        <div className="grid grid-cols-8">
          <h2 className="p-4">name :</h2>
          <h3 className="text-xl font-bold col-span-3 p-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-purple-400 glitch">
            {book.name}
          </h3>
          <h4 className="p-4">written on :</h4>
          <h5 className="text-l font-bold col-span-3 p-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-purple-400 glitch">
          {returnDate(book.writtenOn)}
          </h5>
        </div>
        <div>

        </div>
        <div className="grid grid-cols-6">
          <h2 className="p-4">author :</h2>
          <div className="col-span-5 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-purple-400 glitch">
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
          <div className="col-span-4 flex">
            {book.genres.length !== 0 ? (
              book.genres.map((genre) => (
                  <div className="p-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-purple-400 glitch"><span key={genre.id}>{genre.name}</span></div>
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

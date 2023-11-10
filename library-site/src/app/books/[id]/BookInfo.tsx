import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { PlainBookModel } from '@/models';

type BookInfoProps = {
  book: PlainBookModel;
};

export function BookInfo(props: BookInfoProps): React.JSX.Element {
  const { book } = props;

  function returnDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <FontAwesomeIcon icon={faCircleInfo} className="text-white" size="xl" />
        About this book
      </div>
      <div className="border-gray-500 border-l-2 ml-2 pl-2">
        {book.writtenOn
          ? `Published on : ${returnDate(book.writtenOn)}`
          : 'No date info'}
        <div className="h-3" />
        Genre(s) :&nbsp;
        {book.genres.length !== 0 ? (
          book.genres.map((genre) => (
            <span key={genre.id}> {genre.name}&nbsp;&#x2012;&nbsp;</span>
          ))
        ) : (
          <p>There is no known genre to this book</p>
        )}
      </div>
    </div>
  );
}

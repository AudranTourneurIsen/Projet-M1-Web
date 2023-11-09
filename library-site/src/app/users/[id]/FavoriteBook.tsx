import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { SingleSelectBlock } from '@/components/SingleSelectBlock';
import { PlainBookModel, PlainUserModel } from '@/models';

type FavoriteBookProps = {
  user: PlainUserModel;
  books: PlainBookModel[];
};

export function FavoriteBook(props: FavoriteBookProps): React.JSX.Element {
  const { user, books } = props;

  const [isEditFavoriteBookModalOpen, setIsEditFavoriteBookModalOpen] =
    useState(false);

  const favBookName = user.favoriteBook?.name;

  const favBookText = favBookName
    ? `My favorite book is ${favBookName}`
    : 'This user has no favorite book... yet!';

  const booksOptions = books.map((book) => ({
    id: book.id,
    name: book.name,
  }));

  return (
    <>
      <Modal
        onClose={(): void => setIsEditFavoriteBookModalOpen(false)}
        isOpen={isEditFavoriteBookModalOpen}
        title="Edit favorite book"
      >
        <SingleSelectBlock
          options={booksOptions}
          selectedOptionId={null}
          setSelectedOptionId={(): void => {}}
        />
      </Modal>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <FontAwesomeIcon icon={faHeart} className="text-red-400" size="xl" />{' '}
          <h2>Favorite book</h2>
        </div>
        <div className="border-gray-500 border-l-2 ml-2 pl-2">
          {favBookText}
          <div className="h-3" />
          <Button
            color="info"
            onPress={(): void => setIsEditFavoriteBookModalOpen(true)}
          >
            Edit favorite book
          </Button>
        </div>
      </div>
    </>
  );
}

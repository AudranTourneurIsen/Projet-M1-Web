import React, { useState } from 'react';
import { PlainBookModel, PlainUserModel } from '@/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';

type BookshelfProps = {
  user: PlainUserModel;
  books: PlainBookModel[];
};

export function Bookshelf(props: BookshelfProps): React.JSX.Element {
  const { user, books } = props;

  const [isEditBookshelfModalOpen, setIsEditBookshelfModalOpen] =
    useState(false);

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <FontAwesomeIcon icon={faBook} className="text-lime-400" size="xl" />
          Bookshelf
        </div>
        <div className="border-gray-500 border-l-2 ml-2 pl-2">
          {user.ownedBooks?.map((book) => (
            <div key={book.id}>
              <div className="flex gap-3">
                <FontAwesomeIcon
                  icon={faBook}
                  className="text-lime-400"
                  size="xl"
                />
                {book.name}
              </div>
            </div>
          ))}
          {!user.ownedBooks && (
            <div className="flex gap-3">
              This user has no books in his bookshelf... yet!
            </div>
          )}
          <div className="h-3" />
          <Button
            color="info"
            onPress={(): void => setIsEditBookshelfModalOpen(true)}
          >
            Edit bookshelf
          </Button>
        </div>
      </div>
      <Modal
        onClose={(): void => setIsEditBookshelfModalOpen(false)}
        isOpen={isEditBookshelfModalOpen}
        title="Edit bookshelf"
      >
        ...
      </Modal>
    </>
  );
}

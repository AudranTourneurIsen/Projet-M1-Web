import React, { useCallback, useState } from 'react';
import { PlainBookModel, PlainUserModel } from '@/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { MultiSelectBlock } from '@/components/MultiSelectBlock';

type BookshelfProps = {
  user: PlainUserModel;
  books: PlainBookModel[];
};

export function Bookshelf(props: BookshelfProps): React.JSX.Element {
  const { user, books } = props;

  const [isEditBookshelfModalOpen, setIsEditBookshelfModalOpen] =
    useState(false);

  const cancel = useCallback(() => {
    setIsEditBookshelfModalOpen(false);
  }, []);

  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);

  const save = useCallback(() => {
    console.log('SAVE', selectedBookIds);
    setIsEditBookshelfModalOpen(false);
  }, [selectedBookIds]);

  const booksOptions = books.map((book) => ({
    id: book.id,
    name: book.name,
  }));

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
        <div className="flex flex-col gap-4">
          <MultiSelectBlock
            options={booksOptions}
            selectedOptionIds={selectedBookIds}
            setSelectedOptionIds={setSelectedBookIds}
          />
          <div className="flex justify-between">
            <Button color="info" onPress={cancel}>
              Cancel
            </Button>
            <Button color="success" onPress={save}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

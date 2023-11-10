import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { SingleSelectBlock } from '@/components/SingleSelectBlock';
import { PlainBookModel, PlainUserModel } from '@/models';
import { API_URL } from '@/utils/constants';

type FavoriteBookProps = {
  user: PlainUserModel;
  books: PlainBookModel[];
  reload: () => void;
};

export function FavoriteBook(props: FavoriteBookProps): React.JSX.Element {
  const { user, books, reload } = props;

  const [isEditFavoriteBookModalOpen, setIsEditFavoriteBookModalOpen] =
    useState(false);

  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const favBookName = user.favoriteBook?.name;

  const favBookText = favBookName ? (
    <span>
      My favorite book is{' '}
      <a href={`/books/${user.favoriteBook?.id}`}>{favBookName}</a>
    </span>
  ) : (
    'This user has no favorite book... yet!'
  );

  const booksOptions = books.map((book) => ({
    id: book.id,
    name: book.name,
  }));

  useEffect(() => {
    setSelectedBookId(user?.favoriteBook?.id ?? null);
  }, [user]);

  const cancel = useCallback(() => {
    setSelectedBookId(null);
    setIsEditFavoriteBookModalOpen(false);
  }, []);

  const save = useCallback(async () => {
    if (!selectedBookId) return;
    await axios.post(`${API_URL}/users/${user.id}/edit-favorite-book`, {
      bookId: selectedBookId,
    });
    setIsEditFavoriteBookModalOpen(false);
    reload();
  }, [selectedBookId, user.id, reload]);

  return (
    <>
      <Modal
        onClose={(): void => setIsEditFavoriteBookModalOpen(false)}
        isOpen={isEditFavoriteBookModalOpen}
        title="Edit favorite book"
      >
        <div className="flex flex-col gap-4">
          <SingleSelectBlock
            options={booksOptions}
            selectedOptionId={selectedBookId}
            setSelectedOptionId={setSelectedBookId}
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

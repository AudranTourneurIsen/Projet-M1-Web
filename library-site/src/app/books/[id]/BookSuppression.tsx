import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { PlainBookModel } from '@/models';
import { API_URL } from '@/utils/constants';

type BookSuppressionProps = {
  book: PlainBookModel;
  reload: () => void;
};

export function BookSuppression(
  props: BookSuppressionProps,
): React.JSX.Element {
  const { book, reload } = props;

  const [isDeleteUserModalOpen, setIsDeleteBookModalOpen] = useState(false);

  const cancel = useCallback(() => {
    setIsDeleteBookModalOpen(false);
  }, []);

  const confirm = useCallback(async () => {
    setIsDeleteBookModalOpen(false);
    await axios.delete(`${API_URL}/books/${book.id}/delete`);
    reload();
  }, [reload, book.id]);

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="text-orange-500"
            size="xl"
          />
          Danger zone
        </div>
        <div className="border-gray-500 border-l-2 ml-2 pl-2">
          <Button
            color="danger"
            onPress={(): void => setIsDeleteBookModalOpen(true)}
          >
            Delete book
          </Button>
        </div>
      </div>

      <Modal
        onClose={(): void => setIsDeleteBookModalOpen(false)}
        isOpen={isDeleteUserModalOpen}
        title="Delete book"
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            Are you sure you want to delete this book?
            <br />
            This action cannot be undone.
          </div>
          <div className="flex gap-4 justify-around">
            <Button color="success" onPress={cancel}>
              Cancel, I&apos;ve changed my mind
            </Button>
            <Button color="danger" onPress={confirm}>
              Delete permanently book {book.name}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

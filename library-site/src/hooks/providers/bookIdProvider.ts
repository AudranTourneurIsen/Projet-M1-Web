import axios from 'axios';
import { useState } from 'react';
import { PlainBookModel } from '@/models';

type UseBookProvider = {
  book: PlainBookModel | 'not found' | undefined;
  loadBook: () => void;
};

export const useBook = (bookId: string): UseBookProvider => {
  const [book, setBook] = useState<PlainBookModel | 'not found' | undefined>();

  const fetchBook = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/books/${bookId}`)
      .then((data) => {
        if (!data) {
          setBook('not found');
          return;
        }
        setBook(data.data);
      })
      .catch((err) => {
        setBook('not found');
        console.error(err);
      });
  };

  return { book, loadBook: fetchBook };
};

type BookProvider = {
  useBook: (bookId: string) => UseBookProvider;
};

export const useBookProvider = (): BookProvider => ({
  useBook,
});

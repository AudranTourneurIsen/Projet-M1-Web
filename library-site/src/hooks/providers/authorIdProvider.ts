import axios from 'axios';
import { useState } from 'react';
import {PlainAuthorModel} from '@/models';

type UseAuthorProvider = {
    author: PlainAuthorModel | 'not found' | undefined;
    loadAuthor: () => void;
};

export const useAuthor = (authorId: string | string[]): UseAuthorProvider => {
  const [author, setAuthor] = useState<
    PlainAuthorModel | 'not found' | undefined
  >();

  const fetchAuthor = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/authors/${authorId}`)
      .then((data) => {
        if (!data) {
          setAuthor('not found');
          return;
        }
        setAuthor(data.data);
      })
      .catch((err) => {
        setAuthor('not found');
        console.error(err);
      });
  };

  return { author, loadAuthor: fetchAuthor };
};

type AuthorProvider = {
  useAuthor: (authorId: string | string[]) => UseAuthorProvider;
};

export const useAuthorProvider = (): AuthorProvider => ({
    useAuthor,
});

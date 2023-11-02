import axios from 'axios';
import { useState } from 'react';
import { PlainAuthorModel } from '@/models';

type UseListAuthorsProvider = {
  authors: PlainAuthorModel[];
  loadAuthors: () => void;
};

export const useListAuthors = (): UseListAuthorsProvider => {
  const [authors, setAuthors] = useState<PlainAuthorModel[]>([]);

  const fetchAuthors = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/authors`)
      .then((data) => setAuthors(data.data))
      .catch((err) => console.error(err));
  };

  return { authors, loadAuthors: fetchAuthors };
};

type AuthorProviders = {
  useListAuthors: () => UseListAuthorsProvider;
};

export const useAuthorsProviders = (): AuthorProviders => ({
  useListAuthors,
});

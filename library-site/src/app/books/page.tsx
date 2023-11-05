'use client';

import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { Checkbox, CheckboxGroup } from '@nextui-org/checkbox';
import axios, { AxiosError } from 'axios';
import { useBooksProviders } from '@/hooks';
import { useAuthorsProviders } from '@/hooks/providers/authorProviders';
import { useGenresProviders } from '@/hooks/providers/genreProviders';
import { PlainAuthorModel, PlainGenreModel } from '@/models';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';

const BooksPage: FC = (): ReactElement => {
  const { useListBooks } = useBooksProviders();
  const { useListAuthors } = useAuthorsProviders();
  const { useListGenres } = useGenresProviders();

  const { books, loadBooks } = useListBooks();
  const { authors, loadAuthors } = useListAuthors();
  const { genres, loadGenres } = useListGenres();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = (): void => {
    setIsOpen(!isOpen);
  };

  const [nameInput, setNameInput] = useState<string>('');
  const [writtenOnInput, setWrittenOnInput] = useState<Date>(new Date());
  const [authorInput, setAuthorInput] = useState<PlainAuthorModel>();
  // const [_genresNameInput, _setGenresNameInput] = useState<string[]>([]);
  const [genresInput] = useState<PlainGenreModel[]>([]);

  const [nameGenreInput, setNameGenreInput] = useState<string>('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [genreInputToggle, setGenreInputToggle] = useState<boolean>(true);

  useEffect(() => {
    loadAuthors();
    loadGenres();
    loadBooks();
  }, [loadAuthors, loadGenres, loadBooks]);

  const submitBook = useCallback(() => {
    let errorMsgTmp = '';
    if (!nameInput || nameInput === '') {
      errorMsgTmp = `${errorMsgTmp}Name is required! `;
    }
    if (!writtenOnInput) {
      errorMsgTmp = `${errorMsgTmp}WrittenOn is required! `;
    }
    if (!authorInput || authorInput?.id === '') {
      errorMsgTmp = `${errorMsgTmp}Author is required! `;
    }
    if (genresInput.length === 0) {
      errorMsgTmp = `${errorMsgTmp}At least one genre is required! `;
    }

    setErrorMsg(errorMsgTmp);
    if (errorMsg !== '') {
      return;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/books/new`, {
        name: nameInput,
        writtenOn: writtenOnInput,
        author: authorInput,
        genres: genresInput.map((genre) => genre),
      })
      .then((data) => {
        console.log(data);
        loadAuthors();
        loadGenres();
        loadBooks();
      })
      .catch((err: Error | AxiosError) => {
        if (axios.isAxiosError(err)) {
          // Access to config, request, and response
          if (err.status === 500) {
            setErrorMsg('Server error ! Try again later.');
          } else {
            setErrorMsg(err.response?.data.message);
          }
        } else {
          // Just a stock error
          setErrorMsg(err.message);
        }
      });
  }, [
    nameInput,
    writtenOnInput,
    authorInput,
    genresInput,
    errorMsg,
    loadAuthors,
    loadGenres,
    loadBooks,
  ]);

  const submitGenre = useCallback(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/genres/new`, {
        name: nameGenreInput,
      })
      .then((data) => {
        console.log(data);
        loadAuthors();
        loadGenres();
        loadBooks();
      })
      .catch((err: Error | AxiosError) => {
        if (axios.isAxiosError(err)) {
          // Access to config, request, and response
          if (err.status === 400) {
            setErrorMsg(err.response?.data.message);
          } else if (err.status === 500) {
            setErrorMsg('Server error ! Try again later.');
          }
        } else {
          // Just a stock error
          setErrorMsg(err.message);
        }
      });
  }, [loadAuthors, loadBooks, loadGenres, nameGenreInput]);

  function returnDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <div className="relative p-4">
      <Button color="info" onPress={(): void => setIsOpen(!isOpen)}>
        Add book
      </Button>
      <h1>Books</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Written on
              </th>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
                Genres
              </th>
            </tr>
          </thead>
          <tbody className="border">
            {books.map((book) => (
              <tr
                key={book.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {book.name}
                </th>
                <td className="px-6 py-4">{returnDate(book.writtenOn)}</td>
                <td className="px-6 py-4">
                  {book.author
                    ? `${book.author.firstName} ${book.author.lastName}`
                    : 'Auteur inconnu'}
                </td>
                <td className="px-6 py-4">
                  {book.genres.map((genre) => (
                    <span key={genre.id}>{genre.name}</span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form className="p-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">
              Name
              <input
                type="text"
                name="name"
                id="name"
                className="ml-2 border border-gray-400 rounded bg-gray-100"
                value={nameInput}
                required
                onChange={(e): void => setNameInput(e.target.value)}
              />
            </label>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="writtenOn">
              Written on
              <input
                type="date"
                name="writtenOn"
                id="writtenOn"
                className="ml-2 border border-gray-400 rounded bg-gray-100"
                value={writtenOnInput.toISOString().split('T')[0]}
                required
                onChange={(e): void => {
                  setWrittenOnInput(new Date(e.target.value));
                }}
              />
            </label>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="author">
              Author
              <select
                name="author"
                id="author"
                className="ml-2 border border-gray-400 rounded bg-gray-100"
                value={authorInput?.id}
                required
                onChange={(e): void => {
                  setAuthorInput(
                    authors.find((author) => author.id === e.target.value),
                  );
                }}
              >
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.firstName}
                    {author.lastName}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex flex-col gap-1">
            <CheckboxGroup name="genres" id="genres" color="warning">
              {genres.map((genre) => (
                <Checkbox key={genre.id} value={genre.name}>
                  {genre.name}
                </Checkbox>
              ))}
            </CheckboxGroup>
            <Button
              color="info"
              onPress={(): void => setGenreInputToggle(!genreInputToggle)}
            >
              Add a genre
            </Button>
            <div hidden={genreInputToggle} id="divInputGenre">
              <input
                type="text"
                name="genre"
                id="genre"
                className="ml-2 border border-gray-400 rounded bg-gray-100"
                value={nameGenreInput}
                onChange={(e): void => setNameGenreInput(e.target.value)}
              />
              <Button
                color="info"
                onPress={(): void => {
                  submitGenre();
                  setGenreInputToggle(!genreInputToggle);
                }}
              >
                Add
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-red-500">{errorMsg}</p>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BooksPage;

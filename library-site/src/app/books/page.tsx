'use client';

import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import axios, { AxiosError } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useBooksProviders } from '@/hooks';
import { useAuthorsProviders } from '@/hooks/providers/authorProviders';
import { useGenresProviders } from '@/hooks/providers/genreProviders';
import { PlainAuthorModel } from '@/models';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { TextInput } from '@/components/TextInput';
import { DropdownSelection } from '@/components/DropdownSelection';
import { DropdownCheckboxSelection } from '@/components/DropdownCheckboxSelection';
import { Badge } from '@/components/Badge';
import { SearchBar } from '@/components/SearchBar';

const BooksPage: FC = (): ReactElement => {
  console.log('books re-render');
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
  const [writtenOnDateInput, setWrittenOnDateInput] = useState<Date>(
    new Date(),
  );
  const [authorInput, setAuthorInput] = useState<PlainAuthorModel>();
  // const [_genresNameInput, _setGenresNameInput] = useState<string[]>([]);

  const [nameGenreInput, setNameGenreInput] = useState<string>('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [genreInputToggle, setGenreInputToggle] = useState<boolean>(true);

  const [genresInput, setGenresInput] = useState<
    {
      id: string;
      name: string;
      selected: boolean;
    }[]
  >([]);

  const [searchInput, setSearchInput] = useState<string>('');

  const [displayedBooks, setDisplayedBooks] = useState(books);

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    console.log('searchInput', searchInput);
    if (searchInput || selectedGenres.length > 0) {
      let newBooks = books;

      if (searchInput) {
        newBooks = newBooks.filter(
          (book) =>
            book.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            book.author?.firstName
              .toLowerCase()
              .includes(searchInput.toLowerCase()) ||
            book.author?.lastName
              .toLowerCase()
              .includes(searchInput.toLowerCase()),
        );
      }

      if (selectedGenres.length > 0) {
        console.log('genres selected', selectedGenres);
        newBooks = newBooks.filter((book) =>
          book.genres
            .map((g) => g.id)
            .some((gId) => selectedGenres.includes(gId)),
        );
      }

      setDisplayedBooks(newBooks);
    } else {
      setDisplayedBooks(books);
    }
  }, [searchInput, selectedGenres]);

  useEffect(() => {
    loadAuthors();
    loadGenres();
    loadBooks();
  }, []);

  useEffect(() => {
    setGenresInput(
      genres.map((genre) => ({
        id: genre.id,
        name: genre.name,
        selected: false,
      })),
    );
  }, [genres]);

  useEffect(() => {
    setDisplayedBooks(books);
  }, [books]);

  const submitBook = useCallback(() => {
    if (!nameInput) {
      setErrorMsg('The name of the book is required!');
      return;
    }
    if (!writtenOnDateInput) {
      setErrorMsg('The author of the book is required! ');
      return;
    }
    if (!authorInput?.id) {
      setErrorMsg('The author of the book is required! ');
      return;
    }
    if (!genresInput.length) {
      setErrorMsg('Specifying at least one genre is required!');
      return;
    }

    setErrorMsg('');

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/books/new`, {
        name: nameInput,
        writtenOn: writtenOnDateInput,
        authorId: authorInput.id,
        genres: genresInput
          .filter((genre) => genre.selected)
          .map((g) => ({
            id: g.id,
            name: g.name,
          })),
      })
      .then(() => {
        // console.log(data);
        loadAuthors();
        loadGenres();
        loadBooks();
      })
      .catch((err: Error | AxiosError) => {
        if (axios.isAxiosError(err)) {
          // Access to config, request, and response
          if (err.status === 500) {
            setErrorMsg('Server error! Try again later.');
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
    writtenOnDateInput,
    authorInput,
    genresInput,
    loadAuthors,
    loadGenres,
    loadBooks,
  ]);

  const submitGenre = useCallback(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/genres/new`, {
        name: nameGenreInput,
      })
      .then(() => {
        // console.log(data);
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
    <>
      <div className="flex flex-col items-center justify-center my-4">
        <h1 className="text-2xl font-bold text-center">Books</h1>
        <h2>
          There are currently <span className="font-bold">{books.length}</span>{' '}
          books in the dataset
        </h2>
        <div className="my-8">
          <Button
            color="success"
            onPress={(): void => {
              setIsOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
            &nbsp; Create new book
          </Button>
        </div>
      </div>
      <div className="relative p-4">
        <div className="flex flex-col gap-4 my-8 items-center justify-center">
          <div className="w-[600px] mb-4">
            <SearchBar onChange={setSearchInput} value={searchInput} />
          </div>
          <div className="flex mb-4">
            {' '}
            {genres.map((genre) => (
              <div key={genre.id}>
                <Badge
                  isActive={selectedGenres.includes(genre.id)}
                  onPress={(): void => {
                    console.log(selectedGenres);
                    let currentlySelectedGenres = selectedGenres;
                    if (currentlySelectedGenres.includes(genre.id)) {
                      currentlySelectedGenres = currentlySelectedGenres.filter(
                        (currentGenreId) => currentGenreId !== genre.id,
                      );
                    } else {
                      currentlySelectedGenres.push(genre.id);
                    }
                    setSelectedGenres([...currentlySelectedGenres]);
                  }}
                  label={genre.name}
                />
              </div>
            ))}
          </div>
        </div>
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
              {displayedBooks.map((book) => (
                <tr
                  key={book.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <a href={`/books/${book.id}`}>{book.name}</a>
                  </th>
                  <td className="px-6 py-4">{returnDate(book.writtenOn)}</td>
                  <td className="px-6 py-4">
                    {book.author ? (
                        <a href={`/authors/${book.author.id}`}>
                            {book.author.firstName} {book.author.lastName}
                        </a>
                        ) : (
                        'Auteur inconnu'
                        )}
                  </td>
                  <td className="px-6 py-4">
                    {book.genres.map((genre) => (
                      <span key={genre.id}>{genre.name} &nbsp; </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <form className="p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <TextInput
                placeholder='Name'
                label="Name"
                value={nameInput}
                onChange={(text: string): void => setNameInput(text)}
              />
            </div>
            <div className="flex flex-col gap-1">
              Written on
              <input
                type="date"
                name="writtenOn"
                id="writtenOn"
                className="ml-2 border border-gray-400 rounded bg-gray-100"
                value={writtenOnDateInput.toISOString().split('T')[0]}
                onChange={(e): void => {
                  setWrittenOnDateInput(new Date(e.target.value));
                }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <DropdownSelection
                label="Author"
                onChange={(value: string): void => {
                  setAuthorInput(
                    authors.filter((author) => author.id === value)[0],
                  );
                }}
                propositions={authors.map((author) => ({
                  id: author.id,
                  name: `${author.firstName} ${author.lastName}`,
                }))}
                currentlySelectedId={
                  authors.find((a) => a.id === authorInput?.id)?.id
                }
              />
            </div>
            <div className="flex flex-col gap-1">
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
                  color="success"
                  onPress={(): void => {
                    submitGenre();
                    setGenreInputToggle(!genreInputToggle);
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  Create new book
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <DropdownCheckboxSelection
                label="Select genres"
                state={genresInput}
                setState={setGenresInput}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-red-500">{errorMsg}</p>
            </div>
            <div className="flex justify-between">
              <Button color="info" onPress={onClose}>
                Cancel
              </Button>
              <Button color="success" onPress={submitBook}>
                Save book
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default BooksPage;

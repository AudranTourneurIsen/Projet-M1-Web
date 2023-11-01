'use client';

import {
  FC,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import axios from 'axios';
import { useBooksProviders } from '@/hooks';
import { useAuthorsProviders } from '@/hooks/providers/authorProviders';
import { useGenresProviders } from '@/hooks/providers/genreProviders';
import { PlainAuthorModel, PlainGenreModel } from '@/models';

const BooksPage: FC = (): ReactElement => {
  const { useListBooks } = useBooksProviders();
  const { useListAuthors } = useAuthorsProviders();
  const { useListGenres } = useGenresProviders();

  const { books, load } = useListBooks();
  const { authors } = useListAuthors();
  const { genres } = useListGenres();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [nameInput, setNameInput] = useState<string>('');
  const [writtenOnInput, setWrittenOnInput] = useState<Date>(new Date());
  const [authorInput, setAuthorInput] = useState<PlainAuthorModel>();
  const [genresInput, setGenresInput] = useState<PlainGenreModel[]>([]);

  useEffect(() => {
    load();
  }, []);

  const submit = useCallback(() => {
    console.log(nameInput);
    console.log(writtenOnInput);
    console.log(authorInput);
    console.log(genresInput);

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/books/new`, {
        name: nameInput,
        writtenOn: writtenOnInput,
        authorId: authorInput?.id,
        genresIds: genresInput.map((genre) => genre.id),
      })
      .then((data) => console.log(data))
      .catch((err) => console.error(err));

    onOpenChange();
  }, [nameInput, writtenOnInput, authorInput, genresInput, onOpenChange]);

  function returnDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <div className="relative p-4">
      <Button
        onPress={onOpen}
        className="border rounded bg-green-800 border-green-700"
      >
        Add book
      </Button>
      <h1>Books</h1>
      <table className="border w-8/12">
        <thead className="border">
          <tr>
            <th className="border">name</th>
            <th>written on</th>
            <th className="border">author</th>
            <th>genres</th>
          </tr>
        </thead>
        <tbody className="border">
          {books.map((book, i) => (
            <tr
              key={book.id}
              className={i % 2 === 1 ? 'bg-neutral-700' : 'bg-neutral-800'}
            >
              <td>{book.name}</td>
              <td>{returnDate(book.writtenOn)}</td>
              <td>
                {book.author
                  ? `${book.author.firstName} ${book.author.lastName}`
                  : 'Auteur inconnu'}
              </td>
              <td>
                {book.genres.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-6/12 bg-slate-600 p-2 rounded text-black"
      >
        <ModalContent>
          {(onClose): ReactNode => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add a new book
              </ModalHeader>
              <ModalBody>
                <form>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name">
                      Name
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="ml-2 border border-gray-400 rounded bg-gray-100"
                        value={nameInput}
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
                        onChange={(e): void => {
                          setAuthorInput(
                            authors.find(
                              (author) => author.id === e.target.value,
                            ),
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
                    <label htmlFor="genres">
                      Genres
                      <select
                        name="genres"
                        id="genres"
                        className="ml-2 border border-gray-400 rounded bg-gray-100"
                        multiple
                        value={genresInput.map((genre) => genre.id)}
                        onChange={(e): void => {
                          setGenresInput(
                            genres.filter((genre) =>
                              e.target.value.includes(genre.id),
                            ),
                          );
                        }}
                      >
                        {genres.map((genre) => (
                          <option key={genre.id} value={genre.id}>
                            {genre.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={submit}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BooksPage;

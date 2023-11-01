'use client';

import { FC, ReactElement, ReactNode, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
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

  useEffect(() => load, [books]);

  const bookToSend: {
    name: string;
    writtenOn: Date;
    author: PlainAuthorModel;
    genres: PlainGenreModel[];
  } = {
    name: 'test',
    writtenOn: new Date(),
    author: {
      id: '0',
      firstName: 'test',
      lastName: 'test',
    },
    genres: [],
  };

  return (
    <>
      <h1>Books</h1>
      {books.map((book) => (
        <div key={book.id}>{book.name}</div>
      ))}
      <Button onPress={onOpen}>Add book</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="relative w-6/12 bg-slate-600 p-2 rounded"
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
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={bookToSend.name}
                      onChange={(e): void => {
                        bookToSend.name = e.target.value;
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="writtenOn">Written on</label>
                    <input
                      type="date"
                      id="writtenOn"
                      name="writtenOn"
                      value={bookToSend.writtenOn.toISOString()}
                      onChange={(e): void => {
                        bookToSend.writtenOn = new Date(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="author">Author</label>
                    <select
                      id="author"
                      name="author"
                      value={bookToSend.author.id}
                      onChange={(e): void => {
                        bookToSend.author = authors.find(
                          (author) => author.id === e.target.value,
                        )!;
                      }}
                    >
                      {authors.map((author: PlainAuthorModel) => (
                        <option key={author.id} value={author.id}>
                          {author.firstName}
                          {author.lastName}
                        </option>
                      ))}
                    </select>
                    <Button href="/authors">Add author</Button>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="genres">Genres</label>
                    <select
                      id="genres"
                      name="genres"
                      multiple
                      value={bookToSend.genres.map((genre) => genre.id)}
                      onChange={(e): void => {
                        bookToSend.genres = Array.from(
                          e.target.selectedOptions,
                        ).map(
                          (option) =>
                            genres.find((genre) => genre.id === option.value)!,
                        );
                      }}
                    >
                      {genres.map((genre: PlainGenreModel) => (
                        <option key={genre.id} value={genre.id}>
                          {genre.name}
                        </option>
                      ))}
                    </select>
                    <Button href="/genres">Add genre</Button>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default BooksPage;

'use client';

import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAuthorsProviders } from '@/hooks/providers/authorProviders';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { TextInput } from '@/components/TextInput';
import { AuthorLine } from '@/app/authors/AuthorLine';
import { SearchBar } from '@/components/SearchBar';
import { NumberInput } from '@/components/NumberInput';

const AuthorsPage: FC = () => {
  const { useListAuthors } = useAuthorsProviders();
  const { authors, loadAuthors } = useListAuthors();
  const [displayedAuthors, setDisplayedAuthors] = useState(authors);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isSearchByNumberEnabled, setIsSearchByNumberEnabled] =
    useState<boolean>(false);
  const [minBooksNumber, setMinBooksNumber] = useState<number>(0);
  const [maxBooksNumber, setMaxBooksNumber] = useState<number>(1000);

  useEffect(() => {
    if (searchInput || isSearchByNumberEnabled) {
      let newAuthors = authors;
      if (newAuthors) {
        newAuthors = authors.filter(
          (author) =>
            author.books?.length ||
            author.firstName
              .toLowerCase()
              .includes(searchInput.toLowerCase()) ||
            author.lastName.toLowerCase().includes(searchInput.toLowerCase()),
        );
      }
      if (isSearchByNumberEnabled) {
        newAuthors = newAuthors.filter(
          (author) =>
            author.books?.length &&
            author.books.length >= minBooksNumber &&
            author.books.length <= maxBooksNumber,
        );
      }

      setDisplayedAuthors(newAuthors);
    } else {
      setDisplayedAuthors(authors);
    }
  }, [
    searchInput,
    isSearchByNumberEnabled,
    minBooksNumber,
    maxBooksNumber,
    authors,
  ]);

  useEffect(() => {
    loadAuthors();
  }, []);

  useEffect(() => {
    setDisplayedAuthors(authors);
  }, [authors]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [authorFirstName, setAuthorFirstName] = useState<string>('');
  const [authorLastName, setAuthorLastName] = useState<string>('');
  const [authorImage, setAuthorImage] = useState<File | null>(null);

  async function submitNewAuthor(): Promise<void> {
    const formData = new FormData();
    formData.append('image', authorImage as File);
    formData.append('firstName', authorFirstName);
    formData.append('lastName', authorLastName);
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/authors/new`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    setIsOpen(false);
    loadAuthors();
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center my-4">
        <h1 className="text-2xl font-bold text-center">Authors</h1>
        <h2>
          There are currently{' '}
          <span className="font-bold">{authors.length}</span> authors in the
          dataset
        </h2>
        <div className="my-8">
          <Button
            color="success"
            onPress={(): void => {
              setIsOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
            &nbsp; Create new author
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 my-8 items-center justify-center">
        <div className="w-full max-w-[600px]">
          <SearchBar onChange={setSearchInput} value={searchInput} />
        </div>
        <Button
          color="info"
          onPress={(): void =>
            setIsSearchByNumberEnabled(!isSearchByNumberEnabled)
          }
        >
          {isSearchByNumberEnabled ? 'Disable' : 'Enable'} search by number of
          books
        </Button>
        {isSearchByNumberEnabled && (
          <div className="flex flex-col sm:flex-row gap-4">
            <NumberInput
              value={minBooksNumber}
              onChange={setMinBooksNumber}
              label="Minimum number of books"
            />
            <NumberInput
              value={maxBooksNumber}
              onChange={setMaxBooksNumber}
              label="Maximum number of books"
            />
          </div>
        )}
      </div>
      <div className="h-8" />
      <div className="w-[100vw] md:w-[95vw] lg:w-[90vw] max-w-[950px] flex flex-col mx-auto gap-8">
        {displayedAuthors.map((author) => (
          <AuthorLine key={author.id} author={author} />
        ))}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={(): void => {
          setIsOpen(false);
        }}
      >
        <form className="flex flex-col gap-8 p-6">
          <h1>Author creation</h1>
          <TextInput
            placeholder={'Author\'s first name'}
            label="Author's first name"
            onChange={(newName): void => {
              setAuthorFirstName(newName);
            }}
            value={authorFirstName}
          />
          <TextInput
            placeholder={'Author\'s last name'}
            label="Author's last name"
            onChange={(newName): void => {
              setAuthorLastName(newName);
            }}
            value={authorLastName}
          />
          <input
            type="file"
            onChange={(event): void => {
              setAuthorImage(event.target.files ? event.target.files[0] : null);
            }}
          />
          <div className="flex flex-row-reverse">
            <Button
              color="success"
              onPress={(): Promise<void> => submitNewAuthor()}
            >
              Create new author
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AuthorsPage;

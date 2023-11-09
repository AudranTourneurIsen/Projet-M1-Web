'use client';

import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';

import Image from 'next/image';
import { useAuthorsProviders } from '@/hooks/providers/authorProviders';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { TextInput } from '@/components/TextInput';
import { AuthorLine } from '@/app/authors/AuthorLine';

const AuthorsPage: FC = () => {
  const { useListAuthors } = useAuthorsProviders();
  const { authors, loadAuthors } = useListAuthors();
  const [displayedAuthors, setDisplayedAuthors] = useState(authors);
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    console.log('searchInput', searchInput);
    if (searchInput) {
      setDisplayedAuthors(
          authors.filter(
              (author) =>
                  author.books?.length ||
                  author.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
                  author.lastName.toLowerCase().includes(searchInput.toLowerCase()),
          ),
      );
    } else {
      setDisplayedAuthors(authors);
    }
  }, [searchInput]);

  useEffect(() => {
    loadAuthors();
  }, []);

  useEffect(() => {
    setDisplayedAuthors(authors)
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
      <div className="flex flex-col items-center justify-center my-3">
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
            Create new author
          </Button>
        </div>
      </div>
      <div className={'flex flex-col gap-4 my-8 items-center justify-center '}>
        <div className={'w-[600px]'}>
        <form>
          <label
              htmlFor="search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
              >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
                type="search"
                id="search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search by author or n° of books written"
                onInput={(e): void => {
                  setSearchInput(e.currentTarget.value);
                }}
            />
            <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        </div>
      </div>
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
            label="Author's first name"
            onChange={(newName): void => {
              setAuthorFirstName(newName);
            }}
            value={authorFirstName}
          />
          <TextInput
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

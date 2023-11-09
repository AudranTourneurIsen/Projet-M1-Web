'use client';

import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';

import Image from 'next/image';
import { useAuthorsProviders } from '@/hooks/providers/authorProviders';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { TextInput } from '@/components/TextInput';
import { AuthorLine } from '@/app/authors/AuthorLine';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { SearchBar } from '@/components/SearchBar';

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
            author.firstName
              .toLowerCase()
              .includes(searchInput.toLowerCase()) ||
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
            <FontAwesomeIcon icon={faPlus} />
            &nbsp; Create new author
          </Button>
        </div>
      </div>
      <div className={'flex flex-col gap-4 my-8 items-center justify-center'}>
        <div className={'w-[600px]'}>
          <SearchBar onChange={setSearchInput} value={searchInput} />
        </div>
      </div>
      <div className={"h-8"} />
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

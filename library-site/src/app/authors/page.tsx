'use client';

import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';

import Image from 'next/image';
import { useAuthorsProviders } from '@/hooks/providers/authorProviders';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { TextInput } from '@/components/TextInput';

const AuthorsPage: FC = () => {
  const { useListAuthors } = useAuthorsProviders();
  const { authors, loadAuthors } = useListAuthors();

  useEffect(() => {
    loadAuthors();
  }, []);

  useEffect(() => {
    console.log(authors);
  }, [authors]);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [authorFirstName, setAuthorFirstName] = useState<string>('');
  const [authorLastName, setAuthorLastName] = useState<string>('');
  const [authorImage, setAuthorImage] = useState<File | null>(null);

  const imageRenderer = (imageURL: string): React.JSX.Element => (
    <Image
      width={300}
      height={300}
      src={`data:image/png;base64,${imageURL}`}
      alt="Profile picture"
    />
  );

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
      <p>Les auteurs : {authors.join(', ')}</p>
      <Button
        color="success"
        onPress={(): void => {
          setIsOpen(true);
        }}
      >
        Test
      </Button>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Bibliography
              </th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {author.photo
                    ? imageRenderer(author.photo?.image)
                    : 'no photo available'}
                </th>
                <td className="px-6 py-4">
                  {author.firstName} {author.lastName}
                </td>
                <td className="px-6 py-4">[TODO]</td>
              </tr>
            ))}
          </tbody>
        </table>
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

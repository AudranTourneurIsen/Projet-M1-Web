'use client';

import { FC, useEffect, useState } from 'react';
import axios from 'axios';

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

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [authorFirstName, setAuthorFirstName] = useState<string>('');
  const [authorLastName, setAuthorLastName] = useState<string>('');

  async function submitNewAuthor(): Promise<void> {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/authors/new`, {
      firstName: authorFirstName,
      lastName: authorLastName,
    });
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
                  [TODO]
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

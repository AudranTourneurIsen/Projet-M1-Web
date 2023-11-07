'use client';

import { FC, useEffect, useState } from 'react';
import { useAuthorsProviders } from '@/hooks/providers/authorProviders';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { TextInput } from '@/components/TextInput';
import axios from 'axios';

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
    console.log(authorFirstName, authorLastName);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/authors/new`,
        {
          firstName: authorFirstName,
          lastName: authorLastName,
        },
      );
      console.log(res);

      console.log('réponse serveur =', res);
    } catch (e) {
      console.log(e);
    }
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
            <Button color="success" onPress={(): void => submitNewAuthor()}>
              Create new author
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AuthorsPage;

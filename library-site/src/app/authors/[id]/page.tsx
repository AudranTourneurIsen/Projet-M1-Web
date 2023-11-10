'use client';

import { redirect, useParams } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { useAuthorProvider, useBooksProviders } from '@/hooks';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { TextInput } from '@/components/TextInput';
import { MultiSelectBlock } from '@/components/MultiSelectBlock';

const AuthorDetailsPage: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
  const [isModalBooksOpen, setIsModalBooksOpen] = useState<boolean>(false);
  const { useAuthor } = useAuthorProvider();
  const { id } = useParams();
  const { author, loadAuthor } = useAuthor(id);

  const { useListBooks } = useBooksProviders();
  const { books, loadBooks } = useListBooks();

  const [authorEditFirstName, setAuthorFirstName] = useState<string>('');
  const [authorEditLastName, setAuthorLastName] = useState<string>('');
  const [authorEditImage, setAuthorImage] = useState<File | null>(null);

  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);

  useEffect(() => {
    loadAuthor();
    loadBooks();
    // Boucle infinie si on suit la règle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (author !== 'not found') {
      setSelectedBookIds(author?.books?.map((book) => book.id) || []);
    }
  }, [books, author]);

  if (author === 'not found') {
    return redirect('/authors');
  }

  const onClose = (): void => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
    if (isModalEditOpen) {
      setIsModalEditOpen(false);
    }
    if (isModalBooksOpen) {
      setIsModalBooksOpen(false);
    }
  };

  const imageRenderer = (imageURL: string): React.JSX.Element => {
    const fullBase64Src = `data:image/png;base64,${imageURL}`;
    return (
      <Image
        className="object-cover w-full h-96 md:h-auto md:w-48 rounded-xl"
        src={fullBase64Src}
        alt=""
        width={200}
        height={200}
      />
    );
  };

  if (!id || typeof id !== 'string') {
    redirect('/authors');
  }

  if (!author) {
    return <p>Loading...</p>;
  }

  async function submitEditAuthor(): Promise<void> {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/authors/edit`, {
      id,
      firstName: authorEditFirstName,
      lastName: authorEditLastName,
    });
    loadAuthor();
  }

  async function submitDeleteAuthor(): Promise<void> {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/authors/delete/${id}`,
    );
    // La fonction redirect ne fonctionne pas, on utilise donc location.href
    // eslint-disable-next-line no-restricted-globals
    location.href = '/authors';
  }

  const booksOptions = books.map((book) => ({
    id: book.id,
    name: book.name,
  }));

  async function submitImageAuthor(): Promise<void> {
    const formData = new FormData();
    formData.append('image', authorEditImage as File);
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/authors/edit/image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  }

  return (
    <div className="relative m-10 p-auto">
      <h1 className="text-2xl font-bold text-center">Author Details</h1>
      <div className="flex flex-col ">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="p-4">
            {author.photo ? (
              imageRenderer(author.photo?.image)
            ) : (
              <span>no photo available</span>
            )}
          </div>

          <h3 className="text-3xl font-bold text-center col-span-3 p-4">
            {author.firstName} {author.lastName}
          </h3>
        </div>

        <h3 className="text-xl font-bold text-center col-span-3 p-4">
          {author.books
            ? author.books.map((book) => (
                <a href={`/books/${book.id}`}>{book.name} &nbsp; </a>
              ))
            : "Couldn't find any books written by this author"}
        </h3>
      </div>

      <div className="flex flex-col items-center mt-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col">
            <span className="flex gap-3">
              <span className="text-cyan-500">
                <FontAwesomeIcon icon={faPenToSquare} />
              </span>
              Edit information
            </span>
            <div className="flex gap-4 p-4">
              <div>
                <Button
                  color="info"
                  onPress={(): void => {
                    setIsModalBooksOpen(true);
                  }}
                >
                  Edit book list
                </Button>
              </div>
              <Button
                color="info"
                onPress={(): void => {
                  setIsModalEditOpen(true);
                }}
              >
                Edit author information
              </Button>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-3">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="text-orange-500"
                size="xl"
              />
              Danger zone
            </div>

            <div className="flex p-4">
              <Button
                color="danger"
                onPress={(): void => {
                  setIsModalOpen(true);
                }}
              >
                Delete Author
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Delete Author"
        isOpen={isModalOpen}
        onClose={(): void => {
          setIsModalOpen(false);
        }}
      >
        <h3 className="text-xl font-bold text-center col-span-3 p-4 text-red-600">
          Are you sure you want to delete this author : &nbsp;{' '}
          {author.firstName} &nbsp; {author.lastName}
        </h3>
        <div className="flex justify-between ">
          <Button color="info" onPress={onClose}>
            Cancel
          </Button>
          <Button
            color="danger"
            onPress={(): Promise<void> => submitDeleteAuthor()}
          >
            Proceed
          </Button>
        </div>
      </Modal>

      <Modal
        title="Edit Author Informations"
        isOpen={isModalEditOpen}
        onClose={(): void => {
          setIsModalEditOpen(false);
        }}
      >
        <div className="pt-5">
          <div className="flex flex-col bg-white rounded-lg dark:border-gray-700 dark:bg-gray-800  p-2">
            {author.photo ? (
              imageRenderer(author.photo?.image)
            ) : (
              <span>no photo available</span>
            )}
          </div>
          <div>
            <form className="flex flex-col gap-8 p-6">
              <input
                type="file"
                onChange={(event): void => {
                  setAuthorImage(
                    event.target.files ? event.target.files[0] : null,
                  );
                }}
              />
              <div className="flex justify-between ">
                <Button
                  color="success"
                  onPress={(): Promise<void> => submitImageAuthor()}
                >
                  Modify image
                </Button>
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-8 p-6">
            <h3 className="text-center">
              Author current name : &nbsp; {author.firstName} &nbsp;{' '}
              {author.lastName}
            </h3>

            <div className="w-full flex justify-between">
              <form className="w-full flex justify-between gap-8 p-6">
                <TextInput
                  placeholder={author.firstName}
                  label="Author's new first name"
                  onChange={(newName): void => {
                    setAuthorFirstName(newName);
                  }}
                  value={authorEditFirstName}
                />
                <TextInput
                  placeholder={author.lastName}
                  label="Author's last name"
                  onChange={(newName): void => {
                    setAuthorLastName(newName);
                  }}
                  value={authorEditLastName}
                />
              </form>
            </div>
          </div>
          <div className="flex justify-between ">
            <Button color="info" onPress={onClose}>
              Cancel
            </Button>{' '}
            <Button
              color="success"
              onPress={(): Promise<void> => submitEditAuthor()}
            >
              Change name
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        title="Edit Book List"
        isOpen={isModalBooksOpen}
        onClose={(): void => {
          setIsModalBooksOpen(false);
        }}
      >
        <h3 className="text-xl font-bold text-center col-span-3 p-4 text-red-600">
          <MultiSelectBlock
            options={booksOptions}
            selectedOptionIds={selectedBookIds}
            setSelectedOptionIds={setSelectedBookIds}
          />
        </h3>
        <div className="flex justify-between ">
          <Button color="info" onPress={onClose}>
            Cancel
          </Button>
          <Button color="success" onPress={onClose}>
            Proceed
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AuthorDetailsPage;

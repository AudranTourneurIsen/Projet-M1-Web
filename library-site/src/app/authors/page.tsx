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



  const [searchInput, setSearchInput] = useState<string>('');

  const [displayedauthors, setDisplayedauthors] = useState(authors);

  useEffect(() => {
    console.log('searchInput', searchInput);
    if (searchInput) {
      setDisplayedauthors(
        authors.filter(
          (authors) =>
            authors?.firstName
              .toLowerCase()
              .includes(searchInput.toLowerCase()) ||
            authors?.lastName
              .toLowerCase()
              .includes(searchInput.toLowerCase()),
        ),
      );
    } else {
      setDisplayedauthors(authors);
    }
  }, [searchInput]);


  useEffect(() => {
    setDisplayedauthors(authors);
  }, [authors]);





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
              placeholder="Search"
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
            {displayedauthors.map((author) => (
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

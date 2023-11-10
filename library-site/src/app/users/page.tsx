'use client';

import React, { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import { useUsersProviders } from '@/hooks/providers/userProviders';
import { UserLine } from '@/app/users/UserLine';
import { SearchBar } from '@/components/SearchBar';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useBooksProviders } from '@/hooks';
import { TextInput } from '@/components/TextInput';
import { MultiSelectBlock } from '@/components/MultiSelectBlock';

const UsersPage: FC = () => {
  const { useListUsers } = useUsersProviders();
  const { useListBooks } = useBooksProviders();

  const { users, loadUsers } = useListUsers();
  const { books, loadBooks } = useListBooks();

  const [searchInput, setSearchInput] = useState<string>('');
  const [displayedUsers, setDisplayedUsers] = useState(users);

  const [filterByBookIsModalOpen, setFilterByBookIsModalOpen] = useState(false);

  const [isCreationModalOpen, setIsCreationModalOpen] =
    useState<boolean>(false);

  const [createFirstName, setCreateFirstName] = useState<string>('');
  const [createLastName, setCreateLastName] = useState<string>('');

  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);

  useEffect(() => {
    if (searchInput || selectedBookIds.length > 0) {
      let newUsers = users;
      if (searchInput) {
        newUsers = users.filter(
          (user) =>
            user.ownedBooks?.some((book) =>
              book.name.toLowerCase().includes(searchInput.toLowerCase()),
            ) ||
            user.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchInput.toLowerCase()),
        );
      }
      if (selectedBookIds.length > 0) {
        newUsers = newUsers.filter(
          (user) =>
            user.ownedBooks?.some((book) => selectedBookIds.includes(book.id)),
        );
      }
      setDisplayedUsers(newUsers);
    } else {
      setDisplayedUsers(users);
    }
  }, [searchInput, selectedBookIds, users]);

  useEffect(() => {
    setDisplayedUsers(users);
  }, [users]);

  useEffect(() => {
    loadUsers();
    loadBooks();
    // Boucle infinie si on suit la règle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitUserCreation = async (): Promise<void> => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/new`, {
      firstName: createFirstName,
      lastName: createLastName,
    });
    loadUsers();
    setIsCreationModalOpen(false);
  };

  const bookOptions = books.map((book) => ({
    id: book.id,
    name: book.name,
  }));

  return (
    <>
      <div className="flex flex-col items-center justify-center my-4">
        <h1 className="text-2xl font-bold text-center">Users</h1>
        <h2>
          There are currently <span className="font-bold">{users.length}</span>{' '}
          users in the dataset
        </h2>
        <div className="my-8">
          <Button
            color="success"
            onPress={(): void => {
              setIsCreationModalOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
            &nbsp; Create new user
          </Button>
        </div>
      </div>
      <div className="relative px-4">
        <Modal
          title="Create new user"
          isOpen={isCreationModalOpen}
          onClose={(): void => {
            setIsCreationModalOpen(false);
          }}
        >
          <div className="flex flex-col gap-4">
            <TextInput
              placeholder="First name"
              label="First name"
              onChange={setCreateFirstName}
              value={createFirstName}
            />
            <TextInput
              placeholder="Last name"
              label="Last name"
              onChange={setCreateLastName}
              value={createLastName}
            />

            <div className="flex justify-between">
              <Button
                color="info"
                onPress={(): void => {
                  setIsCreationModalOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button color="success" onPress={submitUserCreation}>
                Save
              </Button>
            </div>
          </div>
        </Modal>

        <div className="flex flex-col gap-12 my-8 items-center justify-center">
          <div className="flex flex-col w-[600px] gap-8">
            <div className="">
              <SearchBar onChange={setSearchInput} value={searchInput} />
            </div>
            <div className="flex flex-col gap-4 justify-center items-center">
              <Button
                color="info"
                onPress={(): void => {
                  setFilterByBookIsModalOpen(!filterByBookIsModalOpen);
                }}
              >
                Filter by books
              </Button>
              {selectedBookIds.length > 0 && (
                <span>
                  Search filter enabled for {selectedBookIds.length} book
                  {selectedBookIds.length > 1 && 's'}
                </span>
              )}
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex flex-col gap-8">
            {displayedUsers.map((user) => (
              <UserLine user={user} key={user.id} />
            ))}
          </div>
        </div>
      </div>
      <Modal
        title="Filter by books owned"
        isOpen={filterByBookIsModalOpen}
        onClose={(): void => {
          setFilterByBookIsModalOpen(false);
        }}
      >
        <MultiSelectBlock
          options={bookOptions}
          selectedOptionIds={selectedBookIds}
          setSelectedOptionIds={setSelectedBookIds}
        />
        <div className="flex flex-row-reverse mt-4">
          <Button
            color="success"
            onPress={(): void => setFilterByBookIsModalOpen(false)}
          >
            Save filters
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default UsersPage;

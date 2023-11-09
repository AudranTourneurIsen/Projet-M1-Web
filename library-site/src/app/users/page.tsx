'use client';

import React, { FC, useEffect, useState } from 'react';
import { useUsersProviders } from '@/hooks/providers/userProviders';

import { UserLine } from '@/app/users/UserLine';
import { SearchBar } from '@/components/SearchBar';
import { Checkbox } from '@/components/Checkbox';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useBooksProviders } from '@/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { TextInput } from '@/components/TextInput';

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

  useEffect(() => {
    if (searchInput) {
      setDisplayedUsers(
        users.filter(
          (user) =>
            user.ownedBooks?.some((book) =>
              book.name.toLowerCase().includes(searchInput.toLowerCase()),
            ) ||
            user.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchInput.toLowerCase()),
        ),
      );
    } else {
      setDisplayedUsers(users);
    }
  }, [searchInput]);

  useEffect(() => {
    setDisplayedUsers(users);
  }, [users]);

  useEffect(() => {
    loadUsers();
    loadBooks();
  }, []);


  const submitUserCreation = async (): Promise<void> => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/new`, {
      firstName: createFirstName,
      lastName: createLastName,
    });
    loadUsers();
    console.log('CREATE', createFirstName, createLastName);
    setIsCreationModalOpen(false);
  };

  return (
    <>
      <div className="relative p-4">
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
        <Modal
          title="Create new user"
          isOpen={isCreationModalOpen}
          onClose={(): void => {
            setIsCreationModalOpen(false);
          }}
        >
          <div className="flex flex-col gap-4">
            <TextInput
              label="First name"
              onChange={setCreateFirstName}
              value={createFirstName}
            />
            <TextInput
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
            <div className="flex gap-4 justify-around">
              <Button
                color="info"
                onPress={(): void => {
                  setFilterByBookIsModalOpen(!filterByBookIsModalOpen);
                }}
              >
                Filter by books
              </Button>
            </div>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div>
              {displayedUsers.map((user) => (
                <UserLine user={user} key={user.id} />
              ))}
            </div>
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
        <div className="flex flex-col gap-4">
          {books.map((book) => (
            <Checkbox key={book.id}>{book.name}</Checkbox>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default UsersPage;

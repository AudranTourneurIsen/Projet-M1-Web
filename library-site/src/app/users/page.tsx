'use client';

import { FC, useEffect, useState } from 'react';
import { useUsersProviders } from '@/hooks/providers/userProviders';

import { UserLine } from '@/app/users/UserLine';
import { SearchBar } from '@/components/SearchBar';
import { Checkbox } from '@/components/Checkbox';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useBooksProviders } from '@/hooks';

const UsersPage: FC = () => {
  const { useListUsers } = useUsersProviders();
  const { useListBooks } = useBooksProviders();

  const { users, loadUsers } = useListUsers();
  const { books, loadBooks } = useListBooks();

  const [searchInput, setSearchInput] = useState<string>('');
  const [displayedUsers, setDisplayedUsers] = useState(users);

  const [filterByBookIsModalOpen, setFilterByBookIsModalOpen] = useState(false);

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

  return (
    <>
      <div className="relative p-4">
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

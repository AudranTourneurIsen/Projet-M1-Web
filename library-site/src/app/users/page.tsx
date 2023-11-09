'use client';

import { FC, useEffect, useState } from 'react';
import { useUsersProviders } from '@/hooks/providers/userProviders';

import { UserLine } from '@/app/users/UserLine';
import { SearchBar } from '@/components/SearchBar';
import { Checkbox } from '@/components/Checkbox';

const UsersPage: FC = () => {
  const { useListUsers } = useUsersProviders();
  // const {books, loadBooks} = useListBooks();
  // const {authors, loadAuthors} = useListAuthors();
  const { users, loadUsers } = useListUsers();

  const [searchInput, setSearchInput] = useState<string>('');
  const [displayedUsers, setDisplayedUsers] = useState(users);

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
  }, []);

  return (
    <div className="relative p-4">
      <div className="flex flex-col gap-12 my-8 items-center justify-center">
        <div className="flex flex-col w-[600px] gap-8">
          <div className="">
            <SearchBar onChange={setSearchInput} value={searchInput} />
          </div>
          <div className="flex gap-4 justify-around">
            <Checkbox>Filter by user name</Checkbox>
            <Checkbox>Filter by book name</Checkbox>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="border">
            {displayedUsers.map((user) => (
              <UserLine user={user} key={user.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;

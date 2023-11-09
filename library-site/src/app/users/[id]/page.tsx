'use client';

import { redirect, useParams } from 'next/navigation';
import React, { FC, useEffect } from 'react';
import Image from 'next/image';
import { useBooksProviders, useUserProvider, useUsersProviders } from '@/hooks';
import { FavoriteBook } from '@/app/users/[id]/FavoriteBook';
import { FavoriteGenres } from '@/app/users/[id]/FavoriteGenres';
import { useGenresProviders } from '@/hooks/providers/genreProviders';
import { Bookshelf } from '@/app/users/[id]/Bookshelf';
import { FriendList } from '@/app/users/[id]/FriendList';
import { DangerZone } from '@/app/users/[id]/DangerZone';

const UserDetailsPage: FC = () => {
  const { id } = useParams();
  const { useUser } = useUserProvider();
  const { useListBooks } = useBooksProviders();
  const { useListGenres } = useGenresProviders();
  const { useListUsers } = useUsersProviders();

  const { user, loadUser } = useUser(typeof id === 'string' ? id : id[0]);
  const { books, loadBooks } = useListBooks();
  const { genres, loadGenres } = useListGenres();
  const { users, loadUsers } = useListUsers();

  useEffect(() => {
    loadUser();
    loadBooks();
    loadGenres();
    loadUsers();
  }, []);

  if (!id || typeof id !== 'string') {
    redirect('/users');
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  if (user === 'not found') {
    return redirect('/users');
  }

  return (
    <div className="flex flex-col">
      <div className="m-4 flex items-center justify-center gap-8">
        <div className="w-20 h-20 sm:w-24 sm:h-24">
          <Image
            src="/avatar-default-icon.png"
            alt=""
            className="rounded-full"
            width={512}
            height={512}
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-semibold">
            {user.firstName} {user.lastName}
          </h1>
        </div>
      </div>
      <div className="flex flex-col m-6 gap-12 mx-auto">
        <FavoriteBook user={user} books={books} />

        <FavoriteGenres user={user} genres={genres} />

        <Bookshelf user={user} books={books} />

        <FriendList user={user} users={users} />

        <DangerZone user={user} />
      </div>
    </div>
  );
};
export default UserDetailsPage;

'use client';

import { redirect, useParams } from 'next/navigation';
import React, { FC, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faHeart,
  faTriangleExclamation,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { useUserProvider } from '@/hooks';
import { Button } from "@/components/Button";

const UserDetailsPage: FC = () => {
  const { id } = useParams();
  const { useUser } = useUserProvider();
  const { user, loadUser } = useUser(typeof id === 'string' ? id : id[0]);

  // const onClose = (): void => {
  //     setIsOpen(!isOpen);
  // };

  useEffect(() => {
    loadUser();
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

  const favBookName = user.favoriteBook?.name;

  const favBookText = favBookName
    ? `My favorite book is ${favBookName}`
    : 'This user has no favorite book... yet!';

  const favGenres = user.favoriteGenres?.map((genre) => genre.name).join(', ');

  const favGenresText = favGenres
    ? `My favorite genres are ${favGenres}`
    : 'This user has no favorite genres... yet!';

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
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <FontAwesomeIcon
              icon={faHeart}
              className="text-red-400"
              size="xl"
            />{' '}
            <h2>Favorite book</h2>
          </div>
          <div className="border-gray-500 border-l-2 ml-2 pl-2">
            {favBookText}
            <div className="h-3" />
            <Button color="info">Edit favorite book</Button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <FontAwesomeIcon
              icon={faHeart}
              className="text-red-400"
              size="xl"
            />
            Favorite genres
          </div>
          <div className="border-gray-500 border-l-2 ml-2 pl-2">
            {favGenresText}
            <div className="h-3" />
            <Button color="info">Edit favorite genres</Button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <FontAwesomeIcon
              icon={faBook}
              className="text-lime-400"
              size="xl"
            />
            Bookshelf
          </div>
          <div className="border-gray-500 border-l-2 ml-2 pl-2">
            {user.ownedBooks?.map((book) => (
              <div key={book.id}>
                <div className="flex gap-3">
                  <FontAwesomeIcon
                    icon={faBook}
                    className="text-lime-400"
                    size="xl"
                  />
                  {book.name}
                </div>
              </div>
            ))}
            {!user.ownedBooks && (
              <div className="flex gap-3">
                This user has no books in his bookshelf... yet!
              </div>
            )}
            <div className="h-3" />
            <Button color="info">Edit bookshelf</Button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <FontAwesomeIcon
              icon={faUserGroup}
              className="text-cyan-500"
              size="xl"
            />
            Friends
          </div>
          <div className="border-gray-500 border-l-2 ml-2 pl-2">
            {user.friends?.map((friend) => (
              <div key={friend.id}>
                <div className="flex gap-3">
                  <FontAwesomeIcon
                    icon={faUserGroup}
                    className="text-cyan-500"
                    size="xl"
                  />
                  {friend.firstName} {friend.lastName}
                </div>
              </div>
            ))}
            {!user.friends && (
              <div className="flex gap-3">This user has no friends... yet!</div>
            )}

            <div className="h-3" />
            <Button color="info">Edit friend list</Button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="text-orange-500"
              size="xl"
            />
            Danger zone
          </div>
          <div className="border-gray-500 border-l-2 ml-2 pl-2">
            <Button color="danger">Delete user</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserDetailsPage;

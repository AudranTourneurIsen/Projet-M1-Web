import React from 'react';
import Image from 'next/image';

import { PlainUserModel } from '@/models';
import { Button } from '@/components/Button';

type UserLineProps = {
  user: PlainUserModel;
};

export function UserLine(props: UserLineProps): React.JSX.Element {
  const { user } = props;
  const imgSize = 128;
  return (
    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-2">
      <div className="flex">
        <div className="flex justify-center items-center w-[128px] h-[128px]">
          <Image
            src="/avatar-default-icon.png"
            width={imgSize}
            height={imgSize}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-between p-4 leading-normal w-full">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {user.firstName} {user.lastName}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Owns <span className="font-bold">{user.ownedBooks?.length}</span>{' '}
            books
          </p>
          <a href={`/users/${user.id}`}>
            <Button color="info">View</Button>
          </a>
        </div>
      </div>
    </div>
  );
}

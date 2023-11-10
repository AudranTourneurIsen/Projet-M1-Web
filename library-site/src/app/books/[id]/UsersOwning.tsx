import React from 'react';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PlainBookModel, PlainUserModel } from '@/models';

type UsersOwningProps = {
  book: PlainBookModel;
};

export function UsersOwning(props: UsersOwningProps): React.JSX.Element {
  const { book } = props;

  const displayedUsers: PlainUserModel[] = book.ownedByUsers || [];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <FontAwesomeIcon icon={faUsers} className="text-cyan-500" size="xl" />
        Users owning this book
      </div>
      <div className="border-gray-500 border-l-2 ml-2 pl-2">
        {displayedUsers.length === 0 ? (
          <p>No user owns this book</p>
        ) : (
          <div>
            <p className="mt-2">Users owning this book:</p>
            <ul className="flex flex-col ml-6">
              {displayedUsers.map((u) => (
                <a
                  key={u.id}
                  href={`/users/${u.id}`}
                  className="font-semibold underline"
                >
                  {u.firstName} {u.lastName}
                </a>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

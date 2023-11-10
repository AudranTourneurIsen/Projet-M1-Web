import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { PlainBookModel } from '@/models';
import { Drawer } from '@/components/Drawer';
import { TextInput } from '@/components/TextInput';
import { DropdownSelection } from '@/components/DropdownSelection';
import { useUsersProviders } from '@/hooks';

type CommentSectionProps = {
  book: PlainBookModel;
};

export function CommentSection(props: CommentSectionProps): React.JSX.Element {
  const { book } = props;
  const [isDrawerActive, setIsDrawerActive] = useState<boolean>(false);
  const [UserCommentInput, setUserCommentInput] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { useListUsers } = useUsersProviders();

  const { users, loadUsers } = useListUsers();

  useEffect(() => {
    loadUsers();
    // Boucle infinie si on suit la règle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const usersOptions = users.map((user) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
  }));

  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const onClose = (): void => {
    setIsOpen(!isOpen);
  };

  const drawerClose = (): void => {
    setIsDrawerActive(false);
  };

  // const submitComment = useCallback(() => {
  //   if (!userName) {
  //     setErrorMsg('Please add a user name');
  //     return;
  //   }
  //   if (!UserCommentInput) {
  //     setErrorMsg('Please add a comment to comment');
  //     return;
  //   }
  //   setErrorMsg('');
  //
  //   axios
  //       .post(`${process.env.NEXT_PUBLIC_API_URL}/books/new`, {
  //         user : userName,
  //         comment : UserCommentInput,
  //       })
  //       .then(() => {
  //         //loadComments();
  //       })
  //
  //       .catch((err: Error | AxiosError) => {
  //         if (axios.isAxiosError(err)) {
  //           // Access to config, request, and response
  //           if (err.status === 500) {
  //             setErrorMsg('Server error! Try again later.');
  //           } else {
  //             setErrorMsg(err.response?.data.message);
  //           }
  //         } else {
  //           // Just a stock error
  //           setErrorMsg(err.message);
  //         }
  //       });
  // }, [
  //   userName,
  //   UserCommentInput,
  //   //loadComments(),
  // ]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <FontAwesomeIcon icon={faComment} className="text-blue-400" size="xl" />
        Comment section
      </div>
      <div className="border-gray-500 border-l-2 ml-2 pl-2 flex items-center">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button"
          data-drawer-target="drawer-navigation"
          data-drawer-show="drawer-navigation"
          aria-controls="drawer-navigation"
          onClick={(): void => {
            setIsDrawerActive(!isDrawerActive);
          }}
        >
          {isDrawerActive ? 'Close' : 'Open'} comment section
        </button>
      </div>

      <Drawer title="Comments" isActive={isDrawerActive} onClose={drawerClose}>
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {book.comments.map((comment) => (
            <li className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <Image
                  className="rounded-full shadow-lg"
                  src="/avatar-default-icon.png"
                  alt=""
                  width={100}
                  height={100}
                />
              </span>

              <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                <div className="items-center justify-between mb-3 sm:flex">
                  <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                    12 - 16 -1999
                  </time>
                  <div className="text-sm font-normal text-gray-500 lex dark:text-gray-300">
                    <b>User</b> commented{' '}
                  </div>
                </div>
                <div className="p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                  Crazy? I was crazy once. They put me in a room. A rubber room.
                  A rubber room with rats. They put me in a rubber room with
                  rubber rats. Rubber rats? I hate rubber rats. They make me
                  crazy. Crazy? I was crazy once. They put me in a room…
                </div>
              </div>
            </li>
          ))}
        </ol>

        <form className="mb-6">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <DropdownSelection
              label="Select user"
              onChange={setSelectedUserId}
              currentlySelectedId={selectedUserId}
              propositions={usersOptions}
            />
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <div className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800">
              <TextInput
                placeholder="Your comment"
                label="Your comment"
                value={UserCommentInput}
                onChange={(text: string): void => setUserCommentInput(text)}
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <TextInput
                placeholder="Comment as User"
                label="Comment as User"
                onChange={(newName): void => {
                  setUserName(newName);
                }}
                value={userName}
              />
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <Button color="info" onPress={onClose}>
              Comment
            </Button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}

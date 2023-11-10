'use client';

import {redirect, useParams, useRouter} from 'next/navigation';
import React, {FC, useCallback, useEffect, useState} from 'react';
import Image from 'next/image';

import {useBookProvider} from '@/hooks';
import {faCircleUser, faPlus} from '@fortawesome/free-solid-svg-icons';
import {Button} from '@/components/Button';
import {Modal} from '@/components/Modal';
import {Drawer} from '@/components/Drawer';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {TextInput} from '@/components/TextInput';
import {AxiosError} from 'axios/index';

const BooksDetailsPage: FC = () => {
    const {id} = useParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {useBook} = useBookProvider();
    const {book, loadBook} = useBook(id);
    const [isDrawerActive, setIsDrawerActive] = useState<boolean>(false);
    const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
    const [UserCommentInput, setUserCommentInput] = useState<string>('');
    const [userName, setUserName] = useState<string>('');

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const onClose = (): void => {
        setIsOpen(!isOpen);
    };

    const drawerClose = (): void => {
        setIsDrawerActive(false);
    };

    const imageRenderer = (imageURL: string): React.JSX.Element => {
        const fullBase64Src = `data:image/png;base64,${imageURL}`;
        return (
            <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src={fullBase64Src}
                alt=""
            />
        );
    };

    if (!id || typeof id !== 'string') {
        redirect('/books');
    }

    useEffect(() => {
    }, []);

    useEffect(() => {
        loadBook();
    }, []);

    if (!book) {
        return <p>Loading...</p>;
    }

    if (book === 'not found') {
        return redirect('/books');
    }

    function returnDate(date: Date): string {
        return new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    const router = useRouter();
    if (shouldRedirect) {
        router.push('/authors');
    }

    async function submitDeleteBook(): Promise<void> {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/books/book/${id}`);
        setShouldRedirect(true);
    }

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
        <>
            <div className="relative m-10 p-auto">
                <h1 className="text-2xl font-bold text-center">Book Details</h1>
                <div className="mt-5 grid gap-5 border rounded bg-gray-900">
                    <div className="grid grid-cols-8">
                        <h3 className="p-4">Book name :</h3>
                        <h4 className="text-xl font-bold col-span-3 p-4 bg-clip-text from-white ">
                            {book.name}
                        </h4>
                        <h3 className="p-4">Publication date :</h3>
                        <h4 className="text-l font-bold col-span-3 p-4 bg-clip-text bg-gradient-to-r">
                            {returnDate(book.writtenOn)}
                        </h4>
                        <h3 className="p-4">Genres :</h3>
                        <h4 className="text-l font-bold col-span-3 p-4 bg-clip-text bg-gradient-to-r">
                            {book.genres.length !== 0 ? (
                                book.genres.map((genre) => (
                                    <span key={genre.id}>{genre.name}&nbsp;&#x2012;&nbsp;</span>
                                ))
                            ) : (
                                <p>There is no known genre to this book</p>
                            )}
                        </h4>
                    </div>
                    <div className="grid grid-cols-8">
                        {book.author?.photo ? (
                            book.author.photo ? (
                                imageRenderer(book.author.photo?.image)
                            ) : (
                                <span>No photo available</span>
                            )
                        ) : (
                            <span>No photo available</span>
                        )}
                    </div>
                    <div className={'grid grid-cols-8'}>
                        <h3 className="p-4">Author name :</h3>
                        <h4
                            className={
                                'text-l font-bold col-span-3 p-4 bg-clip-text bg-gradient-to-r'
                            }
                        >
                            {/*{book.author? ({book.author.firstName} {book.author.lastName}) : <p>There is no know author to this book</p>}*/}
                            Name should be here
                        </h4>
                        <h3 className="p-4">By the same author :</h3>
                        <h4
                            className={
                                'text-l font-bold col-span-3 p-4 bg-clip-text bg-gradient-to-r'
                            }
                        >
                            {/*book.author? ({book.author.books?.map((book) => (&nbsp;<a href={`/books/${book.id}`}>{book.name}</a> &nbsp;&#x2012; ))}) : <p>There is no other book from this author in our library</p>*/}
                            Books should be here
                        </h4>
                    </div>
                    <div className="p-5 grid grid-cols-8">
                        <button
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            type="button"
                            data-drawer-target="drawer-navigation"
                            data-drawer-show="drawer-navigation"
                            aria-controls="drawer-navigation"
                            onClick={() => {
                                setIsDrawerActive(true);
                            }}
                        >
                            Open Comments
                        </button>
                    </div>
                </div>
                <div className={'pt-5'}>
                    <Button color="danger" onPress={(): void => setIsOpen(!isOpen)}>
                        Delete This Book
                    </Button>
                </div>
            </div>

            <Modal
                isOpen={isOpen}
                onClose={(): void => {
                    setIsOpen(false);
                }}
            >
                <div className="flex flex-col gap-4 my-8 items-center justify-center">
                    <h1 className="text-2xl font-bold text-center">
                        Are you sure you want to delete this book ?
                    </h1>

                        <div className={"flex-row-reverse"}>
                            <Button color="info" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="danger" onPress={submitDeleteBook}>
                                Confirm
                            </Button>
                        </div>
                </div>
            </Modal>

            <Drawer
                title={'Comments'}
                isActive={isDrawerActive}
                onClose={drawerClose}
            >
                <ol className="relative border-l border-gray-200 dark:border-gray-700">
                    <li className="mb-10 ml-6">
            <span
                className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <img
                  className="rounded-full shadow-lg"
                  src="/avatar-default-icon.png"
              />
            </span>

                        <div
                            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600">
                            <div className="items-center justify-between mb-3 sm:flex">
                                <time className="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
                                    12 - 16 -1999
                                </time>
                                <div className="text-sm font-normal text-gray-500 lex dark:text-gray-300">
                                    <b>User</b> commented{' '}
                                </div>
                            </div>
                            <div
                                className="p-3 text-xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-300">
                                Crazy? I was crazy once. They put me in a room. A rubber room. A
                                rubber room with rats. They put me in a rubber room with rubber
                                rats. Rubber rats? I hate rubber rats. They make me crazy.
                                Crazy? I was crazy once. They put me in a room…
                            </div>
                        </div>
                    </li>
                </ol>

                <form className="mb-6">
                    <div
                        className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label htmlFor="comment" className="sr-only">
                            Your comment
                        </label>
                        <div
                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800">
                            <TextInput
                                label="Your comment"
                                value={UserCommentInput}
                                onChange={(text: string): void => setUserCommentInput(text)}
                            />
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <TextInput
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
                            {/*Button color="info" onPress={submitComment}>*/}
                            Comment
                        </Button>
                    </div>
                </form>
            </Drawer>
        </>
);
};

export default BooksDetailsPage;

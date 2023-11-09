'use client';

import {FC, useEffect, useState} from "react";
import axios from  "axios";
import {useUsersProviders} from "@/hooks/providers/userProviders";
import { useBooksProviders } from '@/hooks';
import { useAuthorsProviders } from '@/hooks/providers/authorProviders';

import {Button} from "@/components/Button";
import {Modal} from "@/components/Modal";
import {TextInput} from "@/components/TextInput";



const UsersPage: FC = () => {
    const {useListUsers} = useUsersProviders();
    //const {books, loadBooks} = useListBooks();
    //const {authors, loadAuthors} = useListAuthors();
    const{users, loadUsers} = useListUsers();

    const [searchInput, setSearchInput] = useState<string>('');
    const [displayedUsers, setDisplayedUsers] = useState(users);

    useEffect(() => {
        console.log('searchInput', searchInput);
        if (searchInput) {
            setDisplayedUsers(
                users.filter(
                    (user) =>
                        user.ownedBooks?.some((book) => {
                            return book.name.toLowerCase().includes(searchInput.toLowerCase());
                        } ) ||
                        user.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
                        user.lastName
                            .toLowerCase()
                            .includes(searchInput.toLowerCase()),
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
            <div className="flex flex-col gap-4 my-8 items-center justify-center">
                <div className={'w-[600px]'}>
                    <form>
                        <label
                            htmlFor="search"
                            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                        Search
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="search"
                                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search"
                                onInput={(e): void => {
                                    setSearchInput(e.currentTarget.value);
                                }}
                            />
                            <button
                                type="submit"
                                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                First Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                Name
                                </th>
                            </tr>
                        </thead>
                        <tbody className="border">
                            {displayedUsers.map((user) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        <a href={`/users/${user.id}`}>{user.firstName}</a>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.lastName}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UsersPage;
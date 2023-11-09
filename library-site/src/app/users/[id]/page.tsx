'use client';

import {redirect, useParams} from 'next/navigation';
import {FC, useEffect} from 'react';
import { useUserProvider } from "@/hooks";
import {Button} from "@/components/Button";
import { Modal } from '@/components/Modal';
const UserDetailsPage: FC = () => {
    const { id } = useParams();
    const {useUser} = useUserProvider();
    const{user, loadUser} = useUser(id);

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

    return (
        <div className="relative m-10 p-auto">
            <h1 className="text-2xl font-bold text-center">User Details</h1>
            <div className="mt-5 grid gap-5 border rounded w-full">
                <div className="grid grid-cols-8">
                    <h2 className="p-4">User name :</h2>
                    <h3 className="text-xl font-bold text-center col-span-3 p-4">
                        {user.firstName} {user.lastName}
                    </h3>
                </div>
                <div className="grid grid-cols-8">
                    <h2 className="p-4"> Favorite book :</h2>
                    <h3 className={"text-xl font-bold text-center col-span-3 p-4"}>
                        {user.favoriteBook? user.favoriteBook.name : "No favorite book"}
                        {/*<Button color="info" onPress={(): void => ()}>*/}
                        {/*    Change favorite book*/}
                        {/*</Button>*/}

                    </h3>
                </div>
            </div>
        </div>
    );
};
export default UserDetailsPage;

import axios from 'axios';
import { useState } from 'react';
import { PlainUserModel } from '@/models';

type UseUserProvider = {
    user: PlainUserModel | 'not found' | undefined;
    loadUser: () => void;
};

export const useUser = (userId: string): UseUserProvider => {
    const [user, setUser] = useState<PlainUserModel | 'not found' | undefined>();

    const fetchUser = (): void => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
            .then((data) => {
                if (!data) {
                    setUser('not found');
                    return;
                }
                setUser(data.data);
            })
            .catch((err) => {
                setUser('not found');
                console.error(err);
            });
    };

    return { user, loadUser: fetchUser };
};

type UserProvider = {
    useUser: (userId: string) => UseUserProvider;
};

export const useUserProvider = (): UserProvider => ({
    useUser,
});

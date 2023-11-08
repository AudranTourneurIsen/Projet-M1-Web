import axios from 'axios';
import { useState } from 'react';
import { PlainUserModel } from '@/models';

type UseListUsersProvider = {
    users: PlainUserModel[];
    loadUsers: () => void;
};

export const useListUsers = (): UseListUsersProvider => {
    const [users, setUsers] = useState<PlainUserModel[]>([]);

    const fetchUsers = (): void => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
            .then((data) => setUsers(data.data))
            .catch((err) => console.error(err));
    };

    return {users, loadUsers: fetchUsers};
};

type UserProviders = {
    useListUsers: () => UseListUsersProvider;
};

export const useAuthorsProviders = (): UserProviders => ({
    useListUsers,
});

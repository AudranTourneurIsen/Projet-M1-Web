'use client';

import {FC, useEffect, useState} from "react";
import axios from  "axios";
import {useUsersProviders} from "@/hooks/providers/userProviders";

import {Button} from "@/components/Button";
import {Modal} from "@/components/Modal";
import {TextInput} from "@/components/TextInput";

const UsersPage: FC = () => {
    const {useListUsers} = useUsersProviders();
    const {users, loadUsers} = useListUsers();



    return (
        <p>:3 working on it owo</p>
    );
};

export default UsersPage;
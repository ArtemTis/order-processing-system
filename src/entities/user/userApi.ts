import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const globalUrl = process.env.REACT_APP_API_URL;

interface IUser{
    name: string;
}

interface ILogin{ 
    username: string; 
    password: string 
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: globalUrl }),
    endpoints: (build) => ({
        login: build.mutation<IUser, ILogin>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            })
        })
    })
})

export const {useLoginMutation} = userApi

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const globalUrl = process.env.REACT_APP_API_URL;

interface IUser{
    id: number,
    name: string;
    email: string,
    email_verified_at: boolean | null,
}

interface ILoginResponce{
    access_token: string,
    token_type: string,
    user: IUser
}

interface ILogin{ 
    email: string; 
    password: string 
}

interface IRegister{

}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: globalUrl }),
    endpoints: (build) => ({
        login: build.mutation<ILoginResponce, ILogin>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            })
        }),
        register: build.mutation<IUser, IRegister>({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body
            })
        }),
        logout: build.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            })
        })
    })
})

export const {useLoginMutation, useRegisterMutation, useLogoutMutation} = userApi

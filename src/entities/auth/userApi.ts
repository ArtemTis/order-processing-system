import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILogin, ILoginResponse, IRegister, IUser } from '../types';
import { RootState } from '../../app/store/store';

const globalUrl = process.env.REACT_APP_API_URL;


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: globalUrl,
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).auth.access_token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),

    endpoints: (build) => ({
        login: build.mutation<ILoginResponse, ILogin>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
                // onSuccess: async (dispatch, data) => {
                //     const response = data as GetCatFactResponse;
                //     dispatch(set Facts(response.data));
                // }
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

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = userApi

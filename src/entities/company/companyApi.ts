import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICompanyChatsResponse, ILogin, ILoginResponse, IRegister, IUser } from '../types';
import { RootState } from '../../app/store/store';

const globalUrl = process.env.REACT_APP_API_URL;


export const companyApi = createApi({
    reducerPath: 'companyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: globalUrl,
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).auth.access_token
            console.log(token);
            
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),

    endpoints: (build) => ({
        chatsByCompany: build.query<ICompanyChatsResponse, number>({
            query: (chatId) => ({
                url: `/companies/${chatId}/chats`,
                method: 'GET'
            })
        }),

    })
})



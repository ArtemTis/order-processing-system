import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAddGroupVk, IChannel, ICompanyChatsResponse, ILogin, ILoginResponse, IMessagesResponse, IRegister, ISendMessage, IUser, ReqStatus } from '../types';
import { RootState } from '../../app/store/store';

const globalUrl = process.env.REACT_APP_API_URL;


export const channelApi = createApi({
    reducerPath: 'channelApi',
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
    

        channels: build.query<IChannel, void>({
            query: () => ({
                url: `/channels`,
                method: 'GET',
            }),

        }),

        addVkGroup: build.mutation<{message: string}, IAddGroupVk>({
            query: (body) => ({
                url: `/contacts/add-vk-group-contact`,
                method: 'POST',
                body
            }),

        }),
    })
})

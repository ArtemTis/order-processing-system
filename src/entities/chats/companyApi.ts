import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAddPattern, IAddPatternResponse, IChannel, ICompanyChatsResponse, ILogin, ILoginResponse, IMessageSendResponse, IMessagesResponse, IPatterns, IRegister, ISendMessage, ITag, ITypePattern, IUser } from '../types';
import { RootState } from '../../app/store/store';

const globalUrl = process.env.REACT_APP_API_URL;


export const companyApi = createApi({
    reducerPath: 'companyApi',
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
    tagTypes: ['Messages'],

    endpoints: (build) => ({
        chatsByCompany: build.query<ICompanyChatsResponse, number>({
            query: (chatId) => ({
                url: `/companies/${chatId}/chats`,
                method: 'GET'
            })
        }),
        chatsMessages: build.query<IMessagesResponse, number>({
            query: (chatId) => ({
                url: `/chats/${chatId}/messages`,
                method: 'GET'
            }),
            // providesTags: ['Messages']
        }),
        sendMessage: build.mutation<IMessageSendResponse, ISendMessage>({
            query: ({ chatId, text }) => ({
                url: `/chats/${chatId}/messages`,
                method: 'POST',
                body: {
                    text
                }
            }),
            // invalidatesTags: ['Messages']
        }),


        getTypesPatterns: build.query<{ data: ITypePattern }, void>({
            query: () => ({
                url: `/type-of-message-patterns`,
                method: 'GET',
            }),
        }),
        addTypePattern: build.mutation<{ data: ITypePattern[] }, { name: string }>({
            query: (body) => ({
                url: `/type-of-message-patterns`,
                method: 'POST',
                body
            }),
        }),
        addPattern: build.mutation<IAddPatternResponse, IAddPattern>({
            query: (body) => ({
                url: `/message-patterns`,
                method: 'POST',
                body
            }),
        }),
        getPatternsByType: build.query<IPatterns, void>({
            query: () => ({
                url: `/message-patterns`,
                method: 'GET',
            }),
        }),
        addNewTag: build.mutation<{ data: ITag }, { name: string }>({
            query: (body) => ({
                url: `/tags-for-chat`,
                method: 'POST',
                body
            }),
        }),
        getAllTags: build.query<{ data: ITag[] }, void>({
            query: () => ({
                url: `/tags-for-chat`,
                method: 'GET',
            }),
        }),
    }),
})

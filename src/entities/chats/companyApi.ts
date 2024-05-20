import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAddPattern, IAddPatternResponse, IChannel, ICompanyChatsResponse, IDeal, ILogin, ILoginResponse, IMessageSendResponse, IMessagesResponse, IPatterns, IRegister, ISendMessage, IStatusAdd, IStatuseDeal, ITag, ITypePattern, IUser } from '../types';
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
    tagTypes: ['Messages', 'Type', 'Patterns', 'Statuses'],

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
            providesTags: ['Type']
        }),
        addTypePattern: build.mutation<{ data: ITypePattern[] }, { name: string }>({
            query: (body) => ({
                url: `/type-of-message-patterns`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Type']
        }),


        addPattern: build.mutation<IAddPatternResponse, IAddPattern>({
            query: (body) => ({
                url: `/message-patterns`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Patterns',]
        }),
        getPatternsByType: build.query<IPatterns, void>({
            query: () => ({
                url: `/message-patterns`,
                method: 'GET',
            }),
            providesTags: ['Patterns', 'Type']
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


        getDealsByChat: build.query<{ data: IDeal[] }, number>({
            query: (id) => ({
                url: `/chats/${id}/deals`,
                method: 'GET',
            }),
        }),
        getAllStatusesOfDeal: build.query<{ data: IStatuseDeal[] }, void>({
            query: () => ({
                url: `/status-of-deal`,
                method: 'GET',
            }),
            providesTags: ['Statuses']
        }),
        addStatusesOfDeal: build.mutation<string, IStatusAdd>({
            query: (body) => ({
                url: `/status-of-deal`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Statuses']
        }),


    }),
})

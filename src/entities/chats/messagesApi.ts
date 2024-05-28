import { IMessageSendResponse, IMessagesResponse, ISendMailing, ISendMessage } from "../types";
import { companyApi } from "./companyApi";


export const messagesApi = companyApi.injectEndpoints({
  endpoints: (build) => ({
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

    sendMailing: build.mutation<{ amountChats: number}, ISendMailing>({
        query: (body) => ({
            url: `/chats/messages`,
            method: 'POST',
            body
        }),
        // providesTags: ['Messages']
    }),
  }),
})



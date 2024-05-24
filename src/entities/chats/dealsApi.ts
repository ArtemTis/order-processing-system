import { IDeal, IDealSend, IMessageSendResponse, IMessagesResponse, ISendMessage, IStatusAdd, IStatuseDeal } from "../types";
import { companyApi } from "./companyApi";


export const dealsApi = companyApi.injectEndpoints({
  endpoints: (build) => ({
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
    getDealsByChat: build.query<{ data: IDeal[] }, number>({
        query: (id) => ({
            url: `/chats/${id}/deals`,
            method: 'GET',
        }),
    }),
    addDeal: build.mutation<{ data: IDeal }, IDealSend>({
        query: (body) => ({
            url: `/deals`,
            method: 'POST',
            body
        }),
    }),
    closeDeal: build.mutation<{ data: IDeal }, ISendMessage>({
        query: ({ chatId, text }) => ({
            url: `/deals/${chatId}/close`,
            method: 'POST',
            body: {
                text
            }
        }),
    }),
  }),
})
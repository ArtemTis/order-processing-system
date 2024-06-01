import { IDeal, IDealSend, IFullDeal, IMessageSendResponse, IMessagesResponse, ISendMessage, IStatusAdd, IStatuseDeal } from "../types";
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
            providesTags: ['Deals']
        }),
        addDeal: build.mutation<{ data: IDeal }, IDealSend>({
            query: (body) => ({
                url: `/deals`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Deals']
        }),
        closeDeal: build.mutation<{ data: IDeal }, ISendMessage>({
            query: ({ chatId, text }) => ({
                url: `/deals/${chatId}/close`,
                method: 'POST',
                body: {
                    text
                }
            }),
            invalidatesTags: ['Deals']
        }),

        getAllDeals: build.query<{ data: IFullDeal[] }, void>({
            query: () => ({
                url: `/deals`,
                method: 'GET',
            }),
            providesTags: ['Deals']
        }),
        updateDeal: build.mutation<{ data: IDeal }, { dealId: number, body: Omit<IDealSend, 'contact_id'> }>({
            query: ({ dealId, body }) => ({
                url: `/deals/${dealId}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Deals']
        }),
        deleteDeal: build.mutation<{ data: IDeal }, number>({
            query: (dealId) => ({
                url: `/deals/${dealId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Deals']
        }),
    }),
})
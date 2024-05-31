import { IChartResponse, IGetAmountMess } from "../types";
import { companyApi } from "./companyApi";


export const statsApi = companyApi.injectEndpoints({
  endpoints: (build) => ({
    amountMess: build.mutation<number, IGetAmountMess>({
        query: (body) => ({
            url: `/stats/amount-messages-by-dates`,
            method: 'POST',
            body
        }),
    }),
    dealsByDates: build.mutation<number, IGetAmountMess>({
        query: (body) => ({
            url: `/stats/count-deals-by-dates`,
            method: 'POST',
            body
        }),
    }),
    messagesChart: build.mutation<IChartResponse, IGetAmountMess>({
        query: (body) => ({
            url: `/stats/count-messages-by-dates-group-by-day`,
            method: 'POST',
            body
        }),
    }),
    dealsChart: build.mutation<IChartResponse, IGetAmountMess>({
        query: (body) => ({
            url: `/stats/count-deals-by-dates-group-by-day`,
            method: 'POST',
            body
        }),
    }),

  }),
})



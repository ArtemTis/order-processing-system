import { IGetAmountMess } from "../types";
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

  }),
})



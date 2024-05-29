import { IGetAmountMess } from "../types";
import { companyApi } from "./companyApi";


export const statsApi = companyApi.injectEndpoints({
  endpoints: (build) => ({
    amountMess: build.query<number, IGetAmountMess>({
        query: (body) => ({
            url: `/stats/amount-messages-by-dates`,
            method: 'GET',
            body
        }),
    }),
    dealsByDates: build.query<number, IGetAmountMess>({
        query: (body) => ({
            url: `/stats/count-deals-by-dates`,
            method: 'GET',
            body
        }),
    }),

  }),
})



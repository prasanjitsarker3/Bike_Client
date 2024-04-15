import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    saleBike: builder.mutation({
      query: (salesData) => ({
        url: "/sales/sellBike",
        method: "POST",
        body: salesData,
      }),
    }),
    saleBikeHistory: builder.query({
      query: (interval) => ({
        url: `/sales/history?${interval}=true`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSaleBikeMutation, useSaleBikeHistoryQuery } = salesApi;

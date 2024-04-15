import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://l2b2-full-stack-a5-server-side-prasanjitsarker3.vercel.app/api",
    credentials: "include",
  }),
  tagTypes: ["service", "course", "enroll", "sales"],
  endpoints: () => ({}),
});

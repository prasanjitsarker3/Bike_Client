import { baseApi } from "../../api/baseApi";

const userBikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBike: builder.query({
      query: (queryInfo) => ({
        url: "/bikes",
        method: "GET",
        body: queryInfo,
      }),
    }),
    getSingleBike: builder.query({
      query: (id) => ({
        url: `/bikes/${id}`,
        method: "GET",
      }),
    }),
    getUserByeBike: builder.query({
      query: (email) => ({
        url: `/sales?email=${email}`,
        method: "GET",
      }),
    }),
    getSingleSaleBike: builder.query({
      query: (id) => ({
        url: `/sales/${id}`,
        method: "GET",
      }),
    }),
    createServiceRequest: builder.mutation({
      query: (data) => ({
        url: "/service/create-service",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["service"],
    }),

    getUserServiceRequest: builder.query({
      query: (email) => ({
        url: `/service/user-service?email=${email}`,
        method: "GET",
      }),
      providesTags: ["service"],
    }),

    getEnrollCOurse: builder.query({
      query: (email) => ({
        url: `/enroll?email=${email}`,
        method: "GET",
      }),
      providesTags: ["enroll"],
    }),
    createEnrollCourse: builder.mutation({
      query: (data) => ({
        url: "/enroll/create-enroll",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["enroll"],
    }),
  }),
});

export const {
  useGetAllBikeQuery,
  useGetSingleBikeQuery,
  useGetUserByeBikeQuery,
  useGetSingleSaleBikeQuery,
  useCreateServiceRequestMutation,
  useGetUserServiceRequestQuery,
  useCreateEnrollCourseMutation,
  useGetEnrollCOurseQuery,
} = userBikeApi;

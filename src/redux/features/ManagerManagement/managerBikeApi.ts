import { baseApi } from "../../api/baseApi";

const userBikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBikeServiceMaintenance: builder.query({
      query: () => ({
        url: "/service",
        method: "GET",
      }),
      providesTags: ["service"],
    }),
    createNextService: builder.mutation({
      query: (service) => ({
        url: `/service/${service.id}`,
        method: "PATCH",
        body: service,
      }),
      invalidatesTags: ["service"],
    }),
    allBikeCourse: builder.query({
      query: () => ({
        url: "/course",
        method: "GET",
      }),
      providesTags: ["course"],
    }),
    createBikeCourse: builder.mutation({
      query: (data) => ({
        url: "/course/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["course"],
    }),
    deleteBikeCourse: builder.mutation({
      query: (id) => ({
        url: `/course/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["course"],
    }),
    getAllEnrollCOurse: builder.query({
      query: () => ({
        url: `/enroll`,
        method: "GET",
      }),
      providesTags: ["enroll"],
    }),
  }),
});

export const {
  useGetAllBikeServiceMaintenanceQuery,
  useCreateNextServiceMutation,
  useCreateBikeCourseMutation,
  useAllBikeCourseQuery,
  useDeleteBikeCourseMutation,
  useGetAllEnrollCOurseQuery,
} = userBikeApi;

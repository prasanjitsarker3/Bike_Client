import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBike: builder.query({
      query: (queryInfo) => ({
        url: "/bikes",
        method: "GET",
        body: queryInfo,
      }),
    }),
    createBike: builder.mutation({
      query: (bikeInfo) => ({
        url: "/bikes/create",
        method: "POST",
        body: bikeInfo,
      }),
    }),
    updateBikeInfo: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/bikes/${id}`,
        method: "PUT",
        body: updatedData,
      }),
    }),
    singleBikeInfo: builder.query({
      query: ({ id }) => ({
        url: `/bikes/${id}`,
        method: "GET",
      }),
    }),
    deleteBike: builder.mutation({
      query: ({ id }) => ({
        url: `/bikes/${id}`,
        method: "DELETE",
      }),
    }),

    bulkDeleteBike: builder.mutation({
      query: (bikeInfo) => ({
        url: "/bikes/bulkDelete",
        method: "POST",
        body: bikeInfo,
      }),
    }),
  }),
});

export const {
  useCreateBikeMutation,
  useGetAllBikeQuery,
  useUpdateBikeInfoMutation,
  useSingleBikeInfoQuery,
  useDeleteBikeMutation,
  useBulkDeleteBikeMutation,
} = bikeApi;

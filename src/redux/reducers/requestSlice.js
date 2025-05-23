import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const requestsSlice = createApi({
  reducerPath: 'requests',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_URL }),
  endpoints: (build) => ({
    getRequests: build.query({
      query: (ids) => {
        const params = ids.map((id) => `id=${id}`).join("&");
        return `users?${params}`;
      },
    }),
  }),
});

export const { useGetRequestsQuery } = requestsSlice;

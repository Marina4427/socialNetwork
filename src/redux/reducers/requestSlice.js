import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const requestsSlice = createApi({
  reducerPath: "requests",
  tagTypes: ["users"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_URL }),
  endpoints: (build) => ({
    getRequests: build.query({
      async queryFn(ids, _queryApi, _extraOptions, fetchWithBQ) {
        if (!ids || ids.length === 0) {
          return { data: [] }; // возвращаем пустой список, не делаем запрос
        }

        const params = ids.map((id) => `id=${id}`).join("&");
        const result = await fetchWithBQ(`users?${params}`);

        return result.error ? { error: result.error } : { data: result.data };
      },
    }),
  }),
});

export const { useGetRequestsQuery } = requestsSlice;

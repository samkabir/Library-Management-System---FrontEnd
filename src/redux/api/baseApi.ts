import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { createApi } from "@reduxjs/toolkit/query/react"


export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
    tagTypes: ["books", "borrow"],
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: true,
    refetchOnFocus: false, 
    endpoints: (builder) => ({
        getAllBooks : builder.query({
            query : () => "/books?sort=desc&limit=1000",
            providesTags: ["books"]
        }),
        getSingleABook : builder.query({
            query : (id) => `/books/${id}`,
            providesTags: ["books"]
        }),
        getBorrowSummary : builder.query({
            query : () => "/borrow",
            providesTags: ["borrow"]
        }),
        createBorrow: builder.mutation({
            query : (taskData) => ({
                url: "/borrow",
                method: "POST",
                body: taskData
            }),
            invalidatesTags: ["borrow"]
        }),
        createBook: builder.mutation({
            query : (taskData) => ({
                url: "/books",
                method: "POST",
                body: taskData
            }),
            invalidatesTags: ["books"]
        }),
        deleteABook: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["books"]
        }),
       updateBook: builder.mutation({
            query: ({ id, data }) => ({
                url: `/books/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["books"],
        }),
    })
})

export const { useGetAllBooksQuery, useGetBorrowSummaryQuery, useGetSingleABookQuery, useCreateBookMutation, useDeleteABookMutation, useUpdateBookMutation, useCreateBorrowMutation } = baseApi;
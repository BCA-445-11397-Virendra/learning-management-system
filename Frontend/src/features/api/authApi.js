import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn, userLoggedOut } from '../authSlice';

const BASH_URL = 'http://localhost:8000/api/v1/user/'
export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASH_URL,
        credentials: "include"
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url: "register",
                method: "POST",
                body: inputData
            })
        }),
        loginUser: builder.mutation({
            query: (inputData) => ({
                url: "login",
                method: "POST",
                body: inputData
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({ user: result.data.user }))
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        getUser: builder.query({
            query: () => ({
                url: "profile",
                method: "GET",
            }),
            providesTags: ["User"],
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({ user: result.data.user }))
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        updateUser: builder.mutation({
            query: (fromData) => ({
                url: "update",
                method: "PUT",
                body: fromData
            })
        }),
        logOutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "GET",
                credentials: "include",
            }),
            invalidatesTags: ["User"],
            async onQueryStarted(_arg, {dispatch }) {
                try {
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.log(error)
                }
            }
        }),

    })
})

export const { useRegisterUserMutation, useLoginUserMutation, useGetUserQuery, useUpdateUserMutation, useLogOutUserMutation } = authApi;
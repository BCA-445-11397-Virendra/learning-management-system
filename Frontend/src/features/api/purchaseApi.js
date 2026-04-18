import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API = "http://localhost:8000/api/v1/purchase";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createChackoutSession: builder.mutation({
      query: (courseId) => ({
        url: "/checkout/create-chekout-session",
        method: "POST",
        body: { courseId },
      }),
    }),
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
    }),
    getAllPurchaseCourses: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
  }),
});
export const {
  useCreateChackoutSessionMutation,
  useGetCourseDetailWithStatusQuery,
  useGetAllPurchaseCoursesQuery,
} = purchaseApi;

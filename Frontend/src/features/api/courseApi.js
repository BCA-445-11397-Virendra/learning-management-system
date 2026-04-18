import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_URL = "http://localhost:8000/api/v1/course/";
export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_URL,
    credentials: "include",
  }),
  tagTypes: ["Refetch_Creator_Course"],
  endpoints: (builder) => ({
    postCreatorCourse: builder.mutation({
      query: (inputData) => ({
        url: "",
        method: "POST",
        body: inputData,
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    getCreatorCourse: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Course"],
    }),
    editCourse: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    getCouseByid: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Course"],
    }),
    removeCourse: builder.mutation({
      query: (courseId) => ({
        url: `/courses/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    createLecture: builder.mutation({
      query: ({ lectureTitle, courseId }) => ({
        url: `/${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    getCourseLecture: builder.query({
      query: (courseId) => ({
        url: `/${courseId}/lecture`,
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Course"],
    }),
    updateLecture: builder.mutation({
      query: ({
        lectureTitle,
        videoInfo,
        isPreviewFree,
        courseId,
        lectureId,
      }) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "POST",
        body: { lectureTitle, videoInfo, isPreviewFree },
      }),
    }),
    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "DELETE",
      }),
    }),
    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
    }),
    publishCourse: builder.mutation({
      query: ({ courseId, query }) => ({
        url: `/${courseId}?publish=${query}`,
        method: "PATCH",
      }),
    }),
    getPublishCourses: builder.query({
      query: () => ({
        url: "/published/courses",
        method: "GET",
      }),
    }),
    getCourseDetailsById: builder.query({
      query: (courseId) => ({
        url: `/course/details/${courseId}`,
        method: "GET",
      }),
    }),
    getSearchCourse: builder.query({
      query: ({ searchQuery, categories, sortByPrice }) => {
        // Build qiery string
        let queryString = `/search?query=${encodeURIComponent(searchQuery)}`;

        // append cateogry
        if (categories && categories.length > 0) {
          const categoriesString = categories.map(encodeURIComponent).join(",");
          queryString += `&categories=${categoriesString}`;
        }

        // Append sortByPrice is available
        if (sortByPrice) {
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
        }

        return {
          url: queryString,
          method: "GET",
        };
      },
    }),
  }),
});
export const {
  usePostCreatorCourseMutation,
  useGetCreatorCourseQuery,
  useEditCourseMutation,
  useGetCouseByidQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useUpdateLectureMutation,
  useRemoveLectureMutation,
  useRemoveCourseMutation,
  useGetLectureByIdQuery,
  usePublishCourseMutation,
  useGetPublishCoursesQuery,
  useGetCourseDetailsByIdQuery,
  useGetSearchCourseQuery
} = courseApi;

import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addJob: builder.mutation({
      query: (data) => ({
        url: "/job",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
    applyJob: builder.mutation({
      query: (data) => ({
        url: "/apply",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),
    askQuestion: builder.mutation({
      query: (data) => ({
        url: "/query",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Job"],
    }),
    getJobs: builder.query({
      query: () => ({
        url: "/jobs",
      }),
      providesTags: ["Jobs"],
    }),
    getAppliedJobs: builder.query({
      query: (email) => ({
        url: `applied-jobs/${email}`,
      }),
      providesTags: ["Job"],
    }),
    jobById: builder.query({
      query: (id) => ({
        url: `/job/${id}`,
      }),
      providesTags: ["Job"],
    }),
  }),
});

export const {
  useAddJobMutation,
  useGetJobsQuery,
  useJobByIdQuery,
  useApplyJobMutation,
  useGetAppliedJobsQuery,
  useAskQuestionMutation,
} = jobApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export const interviewApi = createApi({
  reducerPath: "interviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jobmate-api-0d1l.onrender.com" ,
    prepareHeaders: (headers, { getState }) => {
      // 🔑 attach JWT from state if available
      const state = getState() as RootState;
       console.log("Auth state in prepareHeaders:", state.auth);
      const token = (getState() as any).auth?.accessToken;
        console.log("Token in prepareHeaders:", token);


      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // ===== FREEFORM =====
    createFreeformSession: builder.mutation({
      query: (body) => ({
        url: "/interview/freeform/session",
        method: "POST",
        body,
      }),
    }),
    sendFreeformMessage: builder.mutation({
      query: ({ chat_id, message }) => ({
        url: "/interview/freeform/message",
        method: "POST",
        body: { chat_id, message },
      }),
    }),
    getFreeformHistory: builder.query({
      query: (chat_id) => `/interview/freeform/${chat_id}/history`,
    }),
    getFreeformUserChats: builder.query<any, void>({
      query: () => "/interview/freeform/user/chats",
    }),

    // ===== STRUCTURED =====
    startStructuredInterview: builder.mutation({
      query: (body) => ({
        url: "/interview/structured/start",
        method: "POST",
        body,
      }),
    }),
    answerStructuredQuestion: builder.mutation({
      query: ({ chat_id, answer }) => ({
        url: `/interview/structured/${chat_id}/answer`,
        method: "POST",
        body: { answer },
      }),
    }),
    getStructuredHistory: builder.query({
      query: (chat_id) => `/interview/structured/${chat_id}/history`,
    }),
    resumeStructuredInterview: builder.query({
      query: (chat_id) => `/interview/structured/${chat_id}/resume`,
    }),
    getStructuredUserChats: builder.query<any, void>({
      query: () => "/interview/structured/user/chats",
    }),
  }),
});

export const {
  // freeform
  useCreateFreeformSessionMutation,
  useSendFreeformMessageMutation,
  useGetFreeformHistoryQuery,
  useGetFreeformUserChatsQuery,
  // structured
  useStartStructuredInterviewMutation,
  useAnswerStructuredQuestionMutation,
  useGetStructuredHistoryQuery,
  useResumeStructuredInterviewQuery,
  useGetStructuredUserChatsQuery,
} = interviewApi;

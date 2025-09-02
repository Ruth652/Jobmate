import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { setCredentials, clearAuth } from "../authSlice";

// Base query
const baseQuery = fetchBaseQuery({
  baseUrl: "",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
  credentials: "include", // send cookies (refresh token)
});

// Wrapper to handle 401 + automatic refresh
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Try to refresh token
    const refreshResult: any = await baseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // Update store with new token
      api.dispatch(
        setCredentials({
          user: refreshResult.data.user || api.getState().auth.user,
          accessToken: refreshResult.data.access_token,
        })
      );
      // Retry original request with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed → log out
      api.dispatch(clearAuth());
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<any, { email: string; password: string }>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    register: builder.mutation<any, { fullName: string; email: string; password: string; otp: string }>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),
    requestOtp: builder.mutation<any, { email: string }>({
      query: (body) => ({ url: "/auth/request-otp", method: "POST", body }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRequestOtpMutation,
  useLogoutMutation,
} = authApi;

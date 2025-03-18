import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IUserInToken} from "../../types/IAuth";

// type userData = {
// 	username: "";
// 	email: "";
// 	password: "";
// 	password2: "";
// };

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://127.0.0.1:8000/api/",
		prepareHeaders: (headers) => {
			headers.set("Content-Type", "application/json");

			return headers;
		},
	}),

	endpoints: (builder) => ({
		register: builder.mutation<IUserInToken, string>({
			query: (body) => ({
				url: "/register/",
				method: "POST",
				body,
			}),
		}),
		login: builder.mutation<{access: string; refresh: string}, string>({
			query: (body) => ({
				url: "/token/",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const {useRegisterMutation, useLoginMutation} = authApi;

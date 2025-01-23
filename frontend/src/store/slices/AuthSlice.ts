import {createSlice} from "@reduxjs/toolkit";
import {IUserInToken} from "../../types/IAuth";
import type {PayloadAction} from "@reduxjs/toolkit";
import {authApi} from "../services/auth";

type initialState = {
	user: IUserInToken;
};

const initialState: initialState = {
	user: {
		fullname: "",
		username: "",
		email: "",
		bio: "",
		image: "",
		verifiead: false,
	},
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(authApi.endpoints.register.matchFulfilled, (state, payload) => {
			console.log(payload);
		});
		builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, {payload}) => {
			localStorage.setItem("token", JSON.stringify(payload));
			console.log(payload);
		});
	},
});

// export const {login, registration} = authSlice.actions;

export const authReducer = authSlice.reducer;

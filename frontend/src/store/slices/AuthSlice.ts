import {createSlice} from "@reduxjs/toolkit";
import {ITokenData, IUserInToken} from "../../types/IAuth";
import type {PayloadAction} from "@reduxjs/toolkit";
import {authApi} from "../services/auth";
import {jwtDecode} from "jwt-decode";

type initialState = {
	baseURL: string;
	user: IUserInToken;
	token: string;
	refresh: string;
};
let initialStateUser: IUserInToken = {
	full_name: "",
	username: "",
	email: "",
	bio: "",
	image: "",
	verified: false,
	user_id: null,
};
if (localStorage.getItem("token") !== null) {
	const decode: ITokenData = jwtDecode(JSON.parse(localStorage.getItem("token")!).access);
	const {username, bio, image, verified, email, full_name, user_id} = decode;
	initialStateUser = {username, bio, image, full_name, verified, email, user_id};
} else {
	initialStateUser = {
		full_name: "",
		username: "",
		email: "",
		bio: "",
		image: "",
		verified: false,
		user_id: null,
	};
}

const initialState: initialState = {
	baseURL: "http://127.0.0.1:8000/api",
	user: initialStateUser,
	token:
		localStorage.getItem("token") !== null ? JSON.parse(localStorage.getItem("token")!).access : "",
	refresh:
		localStorage.getItem("token") !== null
			? JSON.parse(localStorage.getItem("token")!).refresh
			: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setTokens: (state, {payload}) => {
			state.token = payload.token;
			state.refresh = payload.refresh;
		},
		setUser: (state, {payload}) => {
			state.user = payload.user;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(authApi.endpoints.register.matchFulfilled, (state, {payload}) => {
			console.log(payload);
		});
		builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, {payload}) => {
			localStorage.setItem("token", JSON.stringify(payload));
			const decode: ITokenData = jwtDecode(payload.access);
			const {username, bio, image, verified, email, full_name, user_id} = decode;
			state.user = {username, bio, image, full_name, verified, email, user_id};
			state.token = payload.access;
			state.refresh = payload.refresh;
		});
	},
});

export const {setTokens, setUser} = authSlice.actions;

export const authReducer = authSlice.reducer;

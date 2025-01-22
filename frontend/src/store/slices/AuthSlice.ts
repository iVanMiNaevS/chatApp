import {createSlice} from "@reduxjs/toolkit";
import {IUserInToken} from "../../interfaces/IAuth";
import type {PayloadAction} from "@reduxjs/toolkit";

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
	reducers: {
		login: (state) => {
			console.log("login");
		},
	},
});

export const {login} = authSlice.actions;

export const authReducer = authSlice.reducer;

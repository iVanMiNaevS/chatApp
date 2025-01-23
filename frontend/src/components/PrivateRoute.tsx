import React, {FC} from "react";
import {Navigate} from "react-router-dom";

type props = {
	children: React.ReactElement;
};

type tokens = {
	access: string;
	refresh: string;
};

export const PrivateRoute: FC<props> = ({children}) => {
	const token = localStorage.getItem("token");
	let objToken: tokens;
	if (token) {
		objToken = JSON.parse(token);
		return objToken.access ? children : <Navigate to="/login" />;
	} else {
		return <Navigate to="/login" />;
	}
};

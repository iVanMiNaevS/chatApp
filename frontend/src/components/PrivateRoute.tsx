import React, {FC} from "react";
import {Navigate} from "react-router-dom";

type props = {
	children: React.ReactElement;
};

export const PrivateRoute: FC<props> = ({children}) => {
	const token = localStorage.getItem("token");

	return token ? children : <Navigate to="/login" />;
};

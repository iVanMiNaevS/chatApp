import {jwtDecode} from "jwt-decode";
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
	const isTokenValid = (): boolean => {
		const token = localStorage.getItem("token") || sessionStorage.getItem("token");

		if (!token) return false;

		try {
			const decoded: {exp: number} = jwtDecode(JSON.parse(token).access); // Декодируем токен
			return decoded.exp * 1000 > Date.now(); // Проверяем, не истёк ли срок действия токена
		} catch (error) {
			return false; // Ошибка при декодировании → считаем токен недействительным
		}
	};

	if (isTokenValid()) {
		return children;
	} else {
		return <Navigate to="/login" />;
	}
};

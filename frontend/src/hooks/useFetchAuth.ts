import {NavigateFunction} from "react-router-dom";
import {FetchBaseQueryError} from "../types/fetchTypes";
import {useLoginMutation, useRegisterMutation} from "../store/services/auth";

function handlerError(
	setErrFunc: (value: React.SetStateAction<FetchBaseQueryError | undefined>) => void,
	toggleAlertFunc: (value: React.SetStateAction<boolean>) => void,
	err: unknown
) {
	const fetchError = err as FetchBaseQueryError;
	if (typeof fetchError.status == "number" || fetchError.status == "PARSING_ERROR") {
		// Обработка HTTP-ошибок
		setErrFunc(fetchError);
		toggleAlertFunc(true);
	} else {
		// Обработка других ошибок
		setErrFunc(fetchError);
		toggleAlertFunc(true);
	}
}

export function useFetchAuthFunc(type: "login" | "register") {
	const [fetchRegister] = useRegisterMutation();
	const [fetchLogin] = useLoginMutation();
	if (type === "register") {
		return async (
			body: Record<string, any>,
			navigateFunc: NavigateFunction,
			path: string,
			setErrFunc: (value: React.SetStateAction<FetchBaseQueryError | undefined>) => void,
			toggleAlertFunc: (value: React.SetStateAction<boolean>) => void
		) => {
			try {
				const response = await fetchRegister(JSON.stringify(body)).unwrap();
				navigateFunc(path);
			} catch (err) {
				handlerError(setErrFunc, toggleAlertFunc, err);
			}
		};
	} else {
		return async (
			body: Record<string, any>,
			navigateFunc: NavigateFunction,
			path: string,
			setErrFunc: (value: React.SetStateAction<FetchBaseQueryError | undefined>) => void,
			toggleAlertFunc: (value: React.SetStateAction<boolean>) => void
		) => {
			try {
				const response = await fetchLogin(JSON.stringify(body)).unwrap();
				navigateFunc(path);
			} catch (err) {
				handlerError(setErrFunc, toggleAlertFunc, err);
			}
		};
	}
}

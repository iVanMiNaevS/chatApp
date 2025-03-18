import axios from "axios";
import {jwtDecode} from "jwt-decode";
import dayjs from "dayjs";
import {useAppSelector} from "../hooks/redux";
import {useDispatch} from "react-redux";
import {setTokens, setUser} from "../store/slices/AuthSlice";

const baseURL = "http://127.0.0.1:8000/api";

const useAxios = () => {
	const {token, user, refresh} = useAppSelector((store) => store.auth);
	const dispatch = useDispatch();
	const axiosInstance = axios.create({
		baseURL,
		headers: {Authorization: `Bearer ${token}`},
	});

	axiosInstance.interceptors.request.use(async (req) => {
		const user = jwtDecode(token);
		const isExpired = user.exp != undefined && dayjs.unix(user.exp).diff(dayjs()) < 1;

		if (!isExpired) return req;

		const response = await axios.post(`${baseURL}/token/refresh/`, {
			refresh: refresh,
		});
		localStorage.setItem("token", JSON.stringify(response.data));
		localStorage.setItem("token", JSON.stringify(response.data));

		dispatch(setTokens(response.data));
		dispatch(setUser(jwtDecode(response.data.access)));

		req.headers.Authorization = `Bearer ${response.data.access}`;
		return req;
	});

	return axiosInstance;
};

export default useAxios;

import React, {useState} from "react";
import "./login.scss";
import UiButton from "../../UI/UIButton/UiButton";
import {Link, useNavigate} from "react-router-dom";
import UiInput from "../../UI/UIInput/UiInput";
import {useDispatch} from "react-redux";
// import {login} from "../../store/slices/AuthSlice";
import {useAppSelector} from "../../hooks/redux";
import {useLoginMutation, useRegisterMutation} from "../../store/services/auth";
import UIAlert from "../../UI/UIAlert/UiAlert";
import {pickAlertMess} from "../../utils/alert";
import {FieldRules, FormErrors, validateForm} from "../../utils/validationForm";
import {FetchBaseQueryError} from "../../types/fetchTypes";
import {useFetchAuthFunc} from "../../hooks/useFetchAuth";

type fieldsForm = {
	password: string;
	email: string;
};

export const Login = () => {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [vision, setVision] = useState(false);
	const [validErr, setValidErr] = useState<FormErrors<fieldsForm>>({password: "", email: ""});

	const user = useAppSelector((store) => store.auth.user);
	// const [fetchRegister] = useRegisterMutation();

	const rulesForm: FieldRules = {
		email: [
			{type: "required", message: "Email is required"},
			{type: "email", message: "Invalid email format"},
		],
		password: [
			{type: "required", message: "Password is required"},
			{type: "minLength", value: 8, message: "Password must be at least 8 characters"},
		],
	};

	const [error, setError] = useState<FetchBaseQueryError>();
	const [alertVis, setAlertVis] = useState(false);
	const loginFetch = useFetchAuthFunc("login");
	const navigate = useNavigate();

	function closeAlert() {
		setAlertVis(false);
	}

	return (
		<div className="container">
			{alertVis && (
				<UIAlert
					onClose={closeAlert}
					type="error"
					message={`Unexpected Error:', ${error?.status}`}
					duration={8000}
				/>
			)}
			{alertVis && error && typeof error?.status == "number" && (
				<UIAlert
					duration={8000}
					onClose={closeAlert}
					type="error"
					message={`HTTP Error:', ${error?.status},  ${pickAlertMess(error.data)}`}
				/>
			)}
			<div className="login__wrapp">
				<div className="login__box">
					<img src={require("../../imgs/bglogin.jpg")} alt="bg" />
					<form
						className="login__form"
						onSubmit={async (e) => {
							e.preventDefault();
							const errors = validateForm({email, password}, rulesForm);
							if (Object.keys(errors).length !== 0) {
								setValidErr(errors);
								return;
							} else {
								setValidErr({
									password: "",
									email: "",
								});
							}
							await loginFetch({password, email}, navigate, "/", setError, setAlertVis);
						}}
					>
						<h2>Welcome✌️</h2>
						<div className="login__inputs-wrapp">
							<UiInput
								errorMessage={validErr.email}
								classNameInput=""
								type="email"
								id="login-email"
								onChange={(value) => {
									setEmail(value);
								}}
								placeholder="Email@email.com"
								value={email}
							/>
							<label style={{display: `${validErr.email && "none"}`}} htmlFor="login-email">
								Email
							</label>
						</div>
						<div className="login__inputs-wrapp">
							<UiInput
								errorMessage={validErr.password}
								type={!vision ? "password" : "text"}
								id="login-password"
								onChange={(value) => {
									setPassword(value);
								}}
								placeholder={"Password"}
								value={password}
								icon={
									!vision ? (
										<i className="bx bx-low-vision" onClick={() => setVision((prev) => !prev)}></i>
									) : (
										<i className="bx bxs-bullseye" onClick={() => setVision((prev) => !prev)}></i>
									)
								}
							/>
							<label style={{display: `${validErr.password && "none"}`}} htmlFor="login-password">
								Password
							</label>
						</div>
						<UiButton type="submit" label="Log In" onClick={() => {}} />
						<p className="login__not-acc">
							No account? <Link to={"/register"}>Create Now</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

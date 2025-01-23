import React, {useState} from "react";
import "./registration.scss";
import UiButton from "../../UI/UIButton/UiButton";
import {Link, useNavigate} from "react-router-dom";
import UiInput from "../../UI/UIInput/UiInput";
import {useRegisterMutation} from "../../store/services/auth";
import UIAlert from "../../UI/UIAlert/UiAlert";
import {FetchBaseQueryError} from "../../types/fetchTypes";
import {pickAlertMess} from "../../utils/alert";
import {FieldRules, FormErrors, validateForm} from "../../utils/validationForm";
import {useFetchAuthFunc} from "../../hooks/useFetchAuth";

type fieldsForm = {
	password: string;
	email: string;
	username: string;
	repPass: string;
};

export const Register = () => {
	const [password, setPassword] = useState("");
	const [passwordRep, setPasswordRep] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [vision, setVision] = useState(false);
	const [visionRep, setVisionRep] = useState(false);
	const rulesForm: FieldRules = {
		email: [
			{type: "required", message: "Email is required"},
			{type: "email", message: "Invalid email format"},
		],
		password: [
			{type: "required", message: "Password is required"},
			{type: "minLength", value: 8, message: "Password must be at least 8 characters"},
		],
		username: [{type: "required", message: "Username is required"}],
		repPass: [
			{type: "required", message: "Password is required"},
			{type: "similar", linkField: "password", message: "passwords must match"},
		],
	};
	const [validErr, setValidErr] = useState<FormErrors<fieldsForm>>({
		password: "",
		email: "",
		username: "",
		repPass: "",
	});
	const [error, setError] = useState<FetchBaseQueryError>();
	const [alertVis, setAlertVis] = useState(false);

	const navigate = useNavigate();
	let fetchRegister = useFetchAuthFunc("register");

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

			<div className="reg__wrapp">
				<div className="reg__box">
					<img src={require("../../imgs/bglogin.jpg")} alt="bg" />
					<form
						className="reg__form"
						onSubmit={async (e) => {
							e.preventDefault();
							const errors = validateForm(
								{email, password, username, repPass: passwordRep},
								rulesForm
							);
							if (Object.keys(errors).length !== 0) {
								setValidErr(errors);
								return;
							} else {
								setValidErr({
									password: "",
									email: "",
									username: "",
									repPass: "",
								});
							}
							await fetchRegister(
								{username, password, password2: passwordRep, email},
								navigate,
								"/login",
								setError,
								setAlertVis
							);
						}}
					>
						<h2>Welcome to our app✌️</h2>
						<div className="reg__inputs-wrapp">
							<UiInput
								errorMessage={validErr.email}
								classNameInput=""
								type="email"
								id="reg-email"
								onChange={(value) => {
									setEmail(value);
								}}
								placeholder="Email@email.com"
								value={email}
							/>
							<label style={{display: `${validErr.email && "none"}`}} htmlFor="reg-email">
								Email
							</label>
						</div>
						<div className="reg__inputs-wrapp">
							<UiInput
								errorMessage={validErr.username}
								type={"text"}
								id="reg-username"
								onChange={(value) => {
									setUsername(value);
								}}
								placeholder={"3asranec"}
								value={username}
							/>
							<label style={{display: `${validErr.username && "none"}`}} htmlFor="reg-username">
								User name
							</label>
						</div>
						<div className="reg__inputs-wrapp">
							<UiInput
								errorMessage={validErr.password}
								type={!vision ? "password" : "text"}
								id="reg-password"
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
							<label style={{display: `${validErr.password && "none"}`}} htmlFor="reg-password">
								Password
							</label>
						</div>
						<div className="reg__inputs-wrapp">
							<UiInput
								errorMessage={validErr.repPass}
								type={!visionRep ? "password" : "text"}
								id="reg-passwordRep"
								onChange={(value) => {
									setPasswordRep(value);
								}}
								placeholder={"Password"}
								value={passwordRep}
								icon={
									!visionRep ? (
										<i
											className="bx bx-low-vision"
											onClick={() => setVisionRep((prev) => !prev)}
										></i>
									) : (
										<i
											className="bx bxs-bullseye"
											onClick={() => setVisionRep((prev) => !prev)}
										></i>
									)
								}
							/>
							<label style={{display: `${validErr.repPass && "none"}`}} htmlFor="reg-passwordRep">
								Repeat password
							</label>
						</div>
						<UiButton type="submit" label="Register" onClick={() => {}} />
						<p className="reg__have-acc">
							Do you already have an account? <Link to={"/login"}>Login now</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
};

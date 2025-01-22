import React, {useState} from "react";
import "./login.scss";
import UiButton from "../../UI/UIButton/UiButton";
import {Link} from "react-router-dom";
import UiInput from "../../UI/UIInput/UiInput";
import {useDispatch} from "react-redux";
import {login} from "../../store/slices/AuthSlice";

export const Login = () => {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [vision, setVision] = useState(false);
	const [validErr, setValidErr] = useState({pass: "", email: ""});

	const dispath = useDispatch();

	return (
		<div className="container">
			<div className="login__wrapp">
				<div className="login__box">
					<img src={require("../../imgs/bglogin.jpg")} alt="bg" />
					<form
						className="login__form"
						onSubmit={(e) => {
							e.preventDefault();
							dispath(login());
						}}
					>
						<h2>Welcome✌️</h2>
						<div className="login__inputs-wrapp">
							<UiInput
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
								errorMessage={validErr.pass}
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
							<label style={{display: `${validErr.pass && "none"}`}} htmlFor="login-password">
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

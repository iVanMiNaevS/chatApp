import React, {useState} from "react";
import "./registration.scss";
import UiButton from "../../UI/UIButton/UiButton";
import {Link} from "react-router-dom";
import UiInput from "../../UI/UIInput/UiInput";

export const Register = () => {
	const [password, setPassword] = useState("");
	const [passwordRep, setPasswordRep] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [vision, setVision] = useState(false);
	const [visionRep, setVisionRep] = useState(false);
	const [validErr, setValidErr] = useState({pass: "", email: "", username: "", repPass: ""});
	return (
		<div className="container">
			<div className="reg__wrapp">
				<div className="reg__box">
					<img src={require("../../imgs/bglogin.jpg")} alt="bg" />
					<form className="reg__form">
						<h2>Welcome to our app✌️</h2>
						<div className="reg__inputs-wrapp">
							<UiInput
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
								errorMessage={validErr.pass}
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
							<label style={{display: `${validErr.pass && "none"}`}} htmlFor="reg-password">
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

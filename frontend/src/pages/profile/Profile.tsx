import React from "react";
import styles from "./profile.module.scss";
import {useAppSelector} from "../../hooks/redux";
import UiButton from "../../UI/UIButton/UiButton";
import {useNavigate} from "react-router-dom";
const Profile = () => {
	const currentUser = useAppSelector((store) => store.auth.user);
	const navigate = useNavigate();
	function exit() {
		localStorage.removeItem("token");
		navigate("/login");
	}

	return (
		<div className={styles["profile-wrapp"]}>
			<div className={"container " + styles["profile-wrapp__container"]}>
				<img src={require("../../imgs/profile.jpg")} alt="avatar" className={styles.avatar} />
				<div className={styles.profile__info}>
					<h2>{currentUser.username}</h2>
					<p>{currentUser.email}</p>
				</div>
				<UiButton onClick={exit} label="EXIT" />
			</div>
		</div>
	);
};

export default Profile;

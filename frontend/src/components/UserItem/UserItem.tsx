import React, {FC} from "react";
import styles from "./userItem.module.scss";
import {IUserProfile} from "../../types/userInDB";

export type typeUser = {
	changeActive?: (id: number, userObj?: typeUser) => void;
	id: number;
	reciever_id?: number;
	name: string;
	userObj?: typeUser;
};

export const UserItem: FC<typeUser> = ({id, name, changeActive, userObj}) => {
	return (
		<div
			onClick={() => {
				if (changeActive) changeActive(id, userObj);
			}}
			className={styles.userItem}
		>
			<img src={require("../../imgs/profile.jpg")} alt="img" />
			<div className={styles.userItem__info}>
				<div className={styles.userItem__user__name}>{name}</div>
			</div>
		</div>
	);
};

import React, { FC } from "react";
import styles from "./chatItem.module.scss";

export type typeChat = {
	name: string;
	message: string;
	time: string;
	active: boolean;
};

export const ChatItem: FC<typeChat> = ({ name, message, time, active }) => {
	return (
		<div className={active ? `${styles.chat} ${styles.active}` : styles.chat}>
			<img src={require("../../imgs/profile.jpg")} alt="img" />
			<div className={styles.chat__info}>
				<div className={styles.chat__user__name}>{name}</div>
				<div className={styles.chat__last__message}>{message}</div>
			</div>
			<div className={styles.chat__time}>{time}</div>
		</div>
	);
};

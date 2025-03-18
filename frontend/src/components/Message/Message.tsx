import React, { FC } from "react";
import styles from "./message.module.scss";

export type typeMessage = {
	type: "personal" | "sender";
	message: string;
	time: string;
};

export const Message: FC<typeMessage> = ({ type, message, time }) => {
	return (
		<div
			className={
				type === "personal"
					? `${styles.message + " " + styles.personal}`
					: `${styles.message + " " + styles.sender}`
			}
		>
			<span className={styles.text}>{message}</span>
			<span className={styles.time}>{time}</span>
		</div>
	);
};

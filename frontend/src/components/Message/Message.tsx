import React, {FC} from "react";
import styles from "./message.module.scss";
export const Message: FC<{type: "personal" | "sender"}> = ({type}) => {
	return (
		<div
			className={
				type === "personal"
					? `${styles.message + " " + styles.personal}`
					: `${styles.message + " " + styles.sender}`
			}
		>
			<span className={styles.text}>hi bro</span>
			<span className={styles.time}>12:57</span>
		</div>
	);
};

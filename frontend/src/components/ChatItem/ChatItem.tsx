import React, {FC} from "react";
import styles from "./chatItem.module.scss";
import {IUserProfile} from "../../types/userInDB";

export type typeChat = {
	changeActive?: (id: number | undefined) => void;
	id: number;
	name: string;
	message: string;
	time: string;
	active: boolean;
	reciever_id?: number;
	empty: boolean;
	sender?: string;
	sender_id?: number;
};

export const ChatItem: FC<typeChat> = ({
	id,
	name,
	message,
	time,
	active,
	changeActive,
	reciever_id,
	sender,
}) => {
	return (
		<div
			onClick={() => {
				if (changeActive) changeActive(reciever_id);
			}}
			className={active ? `${styles.chat} ${styles.active}` : styles.chat}
		>
			<img src={require("../../imgs/profile.jpg")} alt="img" />
			<div className={styles.chat__info}>
				<div className={styles.chat__user__name}>{name}</div>
				<div className={styles.chat__last__message}>
					<span style={{fontWeight: "bold", color: !active ? "#d2386c" : "white"}}>
						{sender && `${sender}: `}
					</span>
					{message}
				</div>
			</div>
			<div className={styles.chat__time}>{time}</div>
		</div>
	);
};

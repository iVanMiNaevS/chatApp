import React, {useState, useEffect} from "react";
import styles from "./uialert.module.scss";

export interface UIAlertProps {
	message: string;
	type?: "info" | "success" | "warning" | "error"; // Типы уведомлений
	duration?: number; // Продолжительность показа (в миллисекундах)
	onClose?: () => void; // Callback при закрытии
}

const UIAlert: React.FC<UIAlertProps> = ({message, type = "info", duration = 3000, onClose}) => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false);
			if (onClose) onClose();
		}, duration);

		return () => clearTimeout(timer); // Очищаем таймер
	}, [duration, onClose]);

	if (!visible) return null;

	return (
		<div className={`${styles.notification} ${styles[`notification-${type}`]}`}>
			<p>{message}</p>
			<button
				className={styles["notification-close"]}
				onClick={() => {
					setVisible(false);
					if (onClose) {
						onClose();
					}
				}}
			>
				<i className="bx bx-window-close"></i>
			</button>
		</div>
	);
};

export default UIAlert;

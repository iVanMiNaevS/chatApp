import React from "react";
import styles from "./UiButton.module.scss";

type ButtonProps = {
	label: string; // Текст кнопки
	onClick: () => void; // Обработчик клика
	type?: "button" | "submit" | "reset"; // Тип кнопки
	disabled?: boolean; // Состояние disabled
	variant?: "primary" | "secondary" | "danger"; // Вариант стиля кнопки
	icon?: React.ReactNode; // Иконка (если нужна)
	className?: string; // Дополнительные классы стилей
};

const UiButton: React.FC<ButtonProps> = ({
	label,
	onClick,
	type = "button",
	disabled = false,
	variant = "primary",
	icon,
	className = "",
}) => {
	// Базовые стили для кнопки
	const baseStyles = styles["ui-button"];

	// Стили для разных вариантов кнопки
	const variantStyles = {
		primary: "bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300",
		secondary: "bg-gray-500 text-white hover:bg-gray-600 disabled:bg-gray-300",
		danger: "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300",
	};

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`
        ${baseStyles} 
        ${variantStyles[variant]} 
        ${className}
      `}
		>
			{icon && <span style={{marginRight: "5px"}}>{icon}</span>}{" "}
			{/* Рендер иконки, если передана */}
			{label}
		</button>
	);
};

export default UiButton;

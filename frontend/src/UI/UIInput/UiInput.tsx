import React from "react";
import styles from "./UiInput.module.scss";
type InputProps = {
	icon?: React.ReactNode;
	id?: string;
	label?: string; // Метка для поля ввода
	type?: "text" | "email" | "password" | "number"; // Тип input
	value: string; // Значение поля ввода
	onChange: (value: string) => void; // Обработчик изменения значения
	placeholder?: string; // Текст-заполнитель
	disabled?: boolean; // Состояние disabled
	required?: boolean; // Обязательное поле
	className?: string; // Дополнительные классы стилей
	classNameInput?: string;
	errorMessage?: string; // Сообщение об ошибке
};

const UiInput: React.FC<InputProps> = ({
	id,
	label,
	type = "text",
	value,
	onChange,
	placeholder = "",
	disabled = false,
	required = false,
	className = "",
	errorMessage,
	icon,
	classNameInput = "",
}) => {
	return (
		<div className={`${className}`}>
			<input
				id={id}
				type={type}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				disabled={disabled}
				required={required}
				className={`
                    ${styles["ui-input"]}
                    ${classNameInput}
                    ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
                    ${errorMessage ? "border-red-500" : "border-gray-300"}
                    `}
			/>
			{label && (
				<label htmlFor={id} className="mb-2 text-sm font-medium text-gray-700">
					{label}
				</label>
			)}
			{icon && icon}
			{errorMessage && <span className={styles["ui-input__errorMess"]}>{errorMessage}</span>}
		</div>
	);
};

export default UiInput;

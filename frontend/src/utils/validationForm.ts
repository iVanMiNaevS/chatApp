type ValidationRule =
	| {type: "required"; message: string}
	| {type: "minLength"; value: number; message: string}
	| {type: "email"; message: string}
	| {type: "similar"; linkField: string; message: string};

export type FieldRules = Record<string, ValidationRule[]>;

export type FormErrors<T> = Partial<Record<keyof T, string>>;

export function validateForm<T extends Record<string, any>>(
	formData: T,
	fieldRules: FieldRules
): FormErrors<T> {
	const errors: FormErrors<T> = {};

	for (const field in fieldRules) {
		const rules = fieldRules[field];
		const value = formData[field];

		for (const rule of rules) {
			if (rule.type === "required" && (!value || value.toString().trim() === "")) {
				errors[field as keyof T] = rule.message;
				break;
			}

			if (rule.type === "minLength" && value && value.toString().length < rule.value) {
				errors[field as keyof T] = rule.message;
				break;
			}

			if (rule.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.toString())) {
				errors[field as keyof T] = rule.message;
				break;
			}
			if (rule.type === "similar" && value !== formData[rule.linkField]) {
				errors[field as keyof T] = rule.message;
				break;
			}
		}
	}

	return errors;
}

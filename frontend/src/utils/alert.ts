export function pickAlertMess(data: Record<string, any>) {
	if (typeof data === "object" && data !== null) {
		return Object.keys(data)
			.map((key: string) => data[key][0])
			.join(".");
	}
}

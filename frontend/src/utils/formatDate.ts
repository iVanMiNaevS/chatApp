export function formatDate(inputDate: string): string {
	const now = new Date();
	const sentDate = new Date(inputDate);

	// Проверяем, было ли сообщение отправлено сегодня
	const isToday = now.toDateString() === sentDate.toDateString();

	// Форматируем день недели и месяц
	const weekDays = [
		"воскресенье",
		"понедельник",
		"вторник",
		"среда",
		"четверг",
		"пятница",
		"суббота",
	];
	const monthNames = [
		"января",
		"февраля",
		"марта",
		"апреля",
		"мая",
		"июня",
		"июля",
		"августа",
		"сентября",
		"октября",
		"ноября",
		"декабря",
	];

	if (isToday) {
		// Возвращаем время в формате 00:00
		const hours = String(sentDate.getHours()).padStart(2, "0");
		const minutes = String(sentDate.getMinutes()).padStart(2, "0");
		return `${hours}:${minutes}`;
	} else {
		const monthDifference =
			now.getMonth() - sentDate.getMonth() + (now.getFullYear() - sentDate.getFullYear()) * 12;

		if (monthDifference > 0) {
			// Возвращаем название месяца, когда было отправлено сообщение
			return `${monthNames[sentDate.getMonth()]} ${sentDate.getFullYear()}`;
		} else {
			// Возвращаем день недели
			return weekDays[sentDate.getDay()];
		}
	}
}

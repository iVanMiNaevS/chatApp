export type FetchBaseQueryError =
	| {
			status: number; // HTTP-код ошибки
			data: Record<string, any>; // Данные ошибки, возвращаемые сервером
	  }
	| {
			status: "FETCH_ERROR"; // Ошибка сети
			error: string; // Сообщение об ошибке
	  }
	| {
			status: "PARSING_ERROR"; // Ошибка обработки ответа
			originalStatus: number; // Исходный HTTP-статус
			data: string; // Данные, которые не удалось обработать
			error: string; // Сообщение об ошибке
	  }
	| {
			status: "CUSTOM_ERROR"; // Кастомная ошибка, если вы сами её задаете
			data?: unknown; // Дополнительные данные
			error: string; // Сообщение об ошибке
	  };

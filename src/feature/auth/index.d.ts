interface ILogin {
	email: string;
	password: string;
}

interface AuthResponse {
	jwt?: string | undefined;
	user: {
		id: string;
		documentId: string;
		username: string;
		email: string;
		provider: string;
		confirmed: boolean;
		blocked: boolean;
		createdAt: Date | undefined;
		updatedAt: Date | undefined;
		publishedAt: Date | undefined;
		locale: string | undefined;
	};
}

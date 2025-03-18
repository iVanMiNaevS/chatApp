export interface IUserInToken {
	full_name: string;
	username: string;
	email: string;
	bio: string;
	image: string;
	verified: boolean;
}

export interface ITokenData {
	token_type: string;
	exp: number;
	iat: number;
	jti: string;
	user_id: number;
	full_name: string;
	username: string;
	email: string;
	bio: string;
	image: string;
	verified: boolean;
}

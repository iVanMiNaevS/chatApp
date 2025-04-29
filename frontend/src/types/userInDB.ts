export interface IUserInDB {
	date_joined: string;
	email: string;
	first_name: string;
	groups: [];
	id: number;
	is_active: boolean;
	is_staff: boolean;
	is_superuser: boolean;
	last_login: null;
	last_name: string;
	password: string;
	user_permissions: [];
	username: string;
}
export interface IUserProfile {
	full_name: string;
	id: number;
	user: IUserInDB;
}
export interface IChat {
	date: string;
	id: number;
	message: string;
	reciever_profile: IUserProfile;
	sender_profile: IUserProfile;
}
export interface IMessage {
	date: string;
	id: number;
	is_read: boolean;
	message: string;
	reciever: IUserInDB;
	reciever_profile: IUserProfile;
	sender: IUserInDB;
	sender_profile: IUserProfile;
}

import React, {useEffect, useRef, useState} from "react";
import "./home.scss";
import UiInput from "../../UI/UIInput/UiInput";
import {Message, typeMessage} from "../../components/Message/Message";
import UiButton from "../../UI/UIButton/UiButton";
import {ChatItem, typeChat} from "../../components/ChatItem/ChatItem";
import {typeUser, UserItem} from "../../components/UserItem/UserItem";
import {API} from "../../APIConfig";
import {IChat, IMessage, IUserInDB, IUserProfile} from "../../types/userInDB";
import {useAppSelector} from "../../hooks/redux";
import {Link} from "react-router-dom";
import {formatDate} from "../../utils/formatDate";

export const Home = () => {
	const currentUser = useAppSelector((store) => store.auth.user);
	const intervalRef = useRef<number | null>(null);
	const [searchUser, setSearchUser] = useState("");
	const [messageText, setMessageText] = useState("");

	const [toggleSection, setToggleSection] = useState<"chats" | "search">("chats");

	const [users, setUsers] = useState<typeUser[]>([]);
	const [chats, setChats] = useState<typeChat[]>([
		// {id: 1, message: "hi bro", name: "Bob", time: "12:57", active: false},
		// {id: 2, message: "whats up man", name: "Jonh", time: "8:53", active: true},
		// {id: 3, message: "Wow who are you", name: "Ben", time: "16:37", active: false},
	]);
	const [mess, setMess] = useState<typeMessage[]>([
		{id: 1, message: "hi bro", time: "12:57", type: "personal"},
		{id: 2, message: "whats up man", time: "8:53", type: "sender"},
		{id: 3, message: "Wow who are you", time: "16:37", type: "personal"},
	]);
	const [reciever_id, setReciever_id] = useState<number | undefined>(undefined);
	useEffect(() => {
		fetchMyMessages();
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	const sendMessage = async (messageText: string, sender: number, reciever: number) => {
		const token = localStorage.getItem("token");
		if (token) {
			const res = await fetch(`${API}/send-messages/`, {
				method: "POST",
				body: JSON.stringify({
					sender: sender,
					reciever: reciever,
					message: messageText,
					is_read: false,
				}),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${JSON.parse(token).access})}`,
				},
			});
			if (res.ok) {
				setMessageText("");
				fetchMessagesInChat(sender, reciever);
			}
		}
	};

	const fetchMessagesInChat = async (sender_id: number, reciever_id: number) => {
		const token = localStorage.getItem("token");
		if (token) {
			const res = await fetch(`${API}/get-messages/${sender_id}/${reciever_id}/`, {
				headers: {
					Authorization: `Bearer ${JSON.parse(token).access})}`,
				},
			});
			if (res.ok) {
				const data: IMessage[] = await res.json();
				console.log(data);
				const messMap = data.map((mess: IMessage): typeMessage => {
					return {
						id: mess.id,
						message: mess.message,
						time: formatDate(mess.date),
						type: mess.sender_profile.id === currentUser.user_id ? "personal" : "sender",
					};
				});
				setMess(messMap);
			}
		}
	};

	const fetchUsers = async (username: string) => {
		const token = localStorage.getItem("token");
		if (token) {
			const response = await fetch(`${API}/search/${username}/`, {
				headers: {Authorization: `Bearer ${JSON.parse(token).access})}`},
			});
			if (response.ok) {
				const data = await response.json();
				const usersFilter = data
					.filter((user: IUserProfile) => {
						if (user.user.email !== currentUser.email) {
							return true;
						}
					})
					.map((user: IUserProfile): typeUser => {
						return {
							name: user.full_name,
							id: user.id,
							reciever_id: user.id,
						};
					});
				setUsers(usersFilter);
			} else {
				setUsers([]);
			}
		}
	};
	const fetchMyMessages = async () => {
		const token = localStorage.getItem("token");
		if (token) {
			const response = await fetch(`${API}/my-messages/${currentUser.user_id}/`, {
				headers: {Authorization: `Bearer ${JSON.parse(token).access})}`},
			});
			if (response.ok) {
				const data = await response.json();
				const chatsMap = data.map((chat: IChat): typeChat => {
					return {
						name:
							chat.reciever_profile.id === currentUser.user_id
								? chat.sender_profile.full_name
								: chat.reciever_profile.full_name,
						reciever_id:
							chat.reciever_profile.id === currentUser.user_id
								? chat.sender_profile.id
								: chat.reciever_profile.id,
						sender_id: chat.sender_profile.id,
						id: chat.id,
						message: chat.message,
						time: formatDate(chat.date),
						active: false,
						empty: false,
					};
				});

				setChats(chatsMap);
			} else {
				// setUsers([]);
			}
		}
	};
	const changeActiveChat = (id: number | undefined, userObj?: typeUser) => {
		if (intervalRef.current) {
			console.log("in");
			clearInterval(intervalRef.current);
		}
		if (!chats.find((chat) => chat.reciever_id === id && !chat.empty)) {
			if (userObj) {
				setReciever_id(id);
				setChats((prev) => {
					const newChat = {
						name: userObj?.name,
						reciever_id: userObj?.id,
						id: userObj?.id,
						message: "",
						time: formatDate(JSON.stringify(Date.now())),
						active: true,
						empty: true,
					};
					const oldChats = prev.map((item) => ({
						...item,
						active: false,
					}));
					return [newChat, ...oldChats];
				});
				setMess([]);
			}
		} else {
			setReciever_id(id);
			setChats((prevItems) => {
				const chatsMap = prevItems.map((item) => ({
					...item,
					active: item.reciever_id === id ? !item.active : false,
				}));
				return chatsMap.filter((chat) => !chat.empty);
			});
			if (currentUser.user_id && id) {
				intervalRef.current = window.setInterval(() => {
					if (currentUser.user_id && id) {
						fetchMessagesInChat(currentUser.user_id, id);
					}
					// if (!chats.find((chat) => chat.active)) {
					// 	clearInterval(interval);
					// }
				}, 1000);
				fetchMessagesInChat(currentUser.user_id, id);
			}
		}
		setToggleSection("chats");
		setSearchUser("");
	};

	return (
		<div className="home__wrapp">
			<div className="chats-sec">
				<div className="search-users">
					<h2>Chat App</h2>
					<div style={{display: "flex", gap: "1rem"}}>
						{toggleSection === "search" ? (
							<div
								className="search-users__icon-row"
								onClick={() => {
									setToggleSection("chats");
								}}
							>
								<i className="bx bx-left-arrow-alt"></i>
							</div>
						) : (
							<div className="search-users__icon-profile" onClick={() => {}}>
								<Link to="/profile">
									<i className="bx bx-menu"></i>
								</Link>
							</div>
						)}

						<UiInput
							onFocusHandle={() => setToggleSection("search")}
							value={searchUser}
							onChange={(value) => {
								fetchUsers(value);
								setSearchUser(value);
							}}
							placeholder="find user"
							className="search-users__input-wrapp"
						/>
					</div>
				</div>
				{toggleSection === "chats" ? (
					<div className="chats">
						{chats.map((chat) => {
							if (!chat.empty) {
								return (
									<ChatItem
										key={chat.id}
										changeActive={changeActiveChat}
										active={chat.active}
										message={chat.message}
										time={chat.time}
										name={chat.name}
										id={chat.id}
										reciever_id={chat.reciever_id}
										empty={chat.empty}
										sender={chat.sender_id === currentUser.user_id ? "You" : ""}
									/>
								);
							}
						})}
					</div>
				) : (
					<div>
						{users.length !== 0 ? (
							users.map((user) => (
								<UserItem
									key={user.id}
									id={user.id}
									name={user.name}
									changeActive={changeActiveChat}
									userObj={user}
								/>
							))
						) : (
							<div className="chats__text">Результатов нет</div>
						)}
					</div>
				)}
			</div>
			<div className="messages">
				{chats.find((chat) => chat.active) && (
					<>
						<div className="messages__header">
							<img src={require("../../imgs/profile.jpg")} alt="img" />
							<div className="messages__header-info">
								<div className="messages__header-name">
									{chats.find((item) => item.active === true)?.name}
								</div>
								<div className="messages__header-time">
									{chats.find((item) => item.active === true)?.time}
								</div>
							</div>
							<div className="messages__header-func">
								<i className="bx bx-search-alt-2"></i>
								<i className="bx bx-phone"></i>
								<i className="bx bx-dots-vertical-rounded"></i>
							</div>
						</div>

						<div className="messages__container">
							<div className="messages__message-container">
								{mess.map((oneMess) => {
									return (
										<Message
											id={oneMess.id}
											key={oneMess.id}
											type={oneMess.type}
											message={oneMess.message}
											time={oneMess.time}
										/>
									);
								})}
							</div>
							<div className="messages__send-wrapp">
								<UiInput
									value={messageText}
									onChange={(value) => {
										setMessageText(value);
									}}
									className="messages__input-wrapp"
									placeholder="Message"
								/>
								<UiButton
									icon={
										messageText.length >= 1 ? (
											<i className="bx bx-send"></i>
										) : (
											<i className="bx bx-microphone"></i>
										)
									}
									label=""
									onClick={() => {
										console.log(reciever_id);
										if (currentUser.user_id && reciever_id) {
											sendMessage(messageText, currentUser.user_id, reciever_id);
										}
									}}
								/>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

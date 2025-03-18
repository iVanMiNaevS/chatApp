import React, { useState } from "react";
import "./home.scss";
import UiInput from "../../UI/UIInput/UiInput";
import { Message, typeMessage } from "../../components/Message/Message";
import UiButton from "../../UI/UIButton/UiButton";
import { ChatItem, typeChat } from "../../components/ChatItem/ChatItem";

export const Home = () => {
	const [searchUser, setSearchUser] = useState("");
	const [messageText, setMessageText] = useState("");

	const [chats, setChats] = useState<typeChat[]>([
		{ message: "hi bro", name: "Bob", time: "12:57", active: false },
		{ message: "whats up man", name: "Jonh", time: "8:53", active: true },
		{ message: "Wow who are you", name: "Ben", time: "16:37", active: false },
	]);
	const [mess, setMess] = useState<typeMessage[]>([
		{ message: "hi bro", time: "12:57", type: "personal" },
		{ message: "whats up man", time: "8:53", type: "sender" },
		{ message: "Wow who are you", time: "16:37", type: "personal" },
	]);

	return (
		<div className="home__wrapp">
			<div className="chats-sec">
				<div className="search-users">
					<h2>Chat App</h2>
					<UiInput
						value={searchUser}
						onChange={(value) => {
							setSearchUser(value);
						}}
						placeholder="find user"
					/>
				</div>
				<div className="chats">
					{chats.map((chat) => {
						return (
							<ChatItem
								active={chat.active}
								message={chat.message}
								time={chat.time}
								name={chat.name}
							/>
						);
					})}
				</div>
			</div>
			<div className="messages">
				<div className="messages__header">
					<img src={require("../../imgs/profile.jpg")} alt="img" />
					<div className="messages__header-info">
						<div className="messages__header-name">Bob</div>
						<div className="messages__header-time">12:57</div>
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
							icon={<i className="bx bx-microphone"></i>}
							label=""
							onClick={() => {}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

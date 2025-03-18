import React, {useState} from "react";
import "./home.scss";
import UiInput from "../../UI/UIInput/UiInput";
import {Message} from "../../components/Message/Message";
import UiButton from "../../UI/UIButton/UiButton";
export const Home = () => {
	const [chats, setChats] = useState([
		{message: "hi bro", name: "bob", time: "12:57"},
		{message: "hi bro", name: "bob", time: "12:57"},
		{message: "hi bro", name: "bob", time: "12:57"},
	]);

	return (
		<div className="home__wrapp">
			<div className="chats-sec">
				<div className="search-users">
					<h2>Chat App</h2>
					<UiInput value="" onChange={() => {}} placeholder="find user" />
				</div>
				<div className="chats">
					<div className="chat">
						<img src={require("../../imgs/profile.jpg")} alt="img" />
						<div className="chat__info">
							<div className="chat__user-name">bob</div>
							<div className="chat__last-message">hi</div>
						</div>
						<div className="chat__time">12:57</div>
					</div>
					<div className="chat active">
						<img src={require("../../imgs/profile.jpg")} alt="img" />
						<div className="chat__info">
							<div className="chat__user-name">bob</div>
							<div className="chat__last-message">
								hi bob, how are you man? dfas dfa sdf a sdfs adfasdf
							</div>
						</div>
						<div className="chat__time">12:57</div>
					</div>
					<div className="chat">
						<img src={require("../../imgs/profile.jpg")} alt="img" />
						<div className="chat__info">
							<div className="chat__user-name">bob</div>
							<div className="chat__last-message">hi</div>
						</div>
						<div className="chat__time">12:57</div>
					</div>
					<div className="chat">
						<img src={require("../../imgs/profile.jpg")} alt="img" />
						<div className="chat__info">
							<div className="chat__user-name">bob</div>
							<div className="chat__last-message">hi</div>
						</div>
						<div className="chat__time">12:57</div>
					</div>
					<div className="chat">
						<img src={require("../../imgs/profile.jpg")} alt="img" />
						<div className="chat__info">
							<div className="chat__user-name">bob</div>
							<div className="chat__last-message">hi</div>
						</div>
						<div className="chat__time">12:57</div>
					</div>
					<div className="chat">
						<img src={require("../../imgs/profile.jpg")} alt="img" />
						<div className="chat__info">
							<div className="chat__user-name">bob</div>
							<div className="chat__last-message">hi</div>
						</div>
						<div className="chat__time">12:57</div>
					</div>
					<div className="chat">
						<img src={require("../../imgs/profile.jpg")} alt="img" />
						<div className="chat__info">
							<div className="chat__user-name">bob</div>
							<div className="chat__last-message">hi</div>
						</div>
						<div className="chat__time">12:57</div>
					</div>
					<div className="chat">
						<img src={require("../../imgs/profile.jpg")} alt="img" />
						<div className="chat__info">
							<div className="chat__user-name">bob</div>
							<div className="chat__last-message">hi</div>
						</div>
						<div className="chat__time">12:57</div>
					</div>
					<div className="chat">
						<img src={require("../../imgs/profile.jpg")} alt="img" />
						<div className="chat__info">
							<div className="chat__user-name">bob</div>
							<div className="chat__last-message">hi</div>
						</div>
						<div className="chat__time">12:57</div>
					</div>
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
						<Message type="sender" />
						<Message type="personal" />
						<Message type="sender" />
						<Message type="personal" />
						<Message type="sender" />
						<Message type="personal" />
						<Message type="sender" />
						<Message type="personal" />
						<Message type="sender" />
						<Message type="personal" />
						<Message type="sender" />
						<Message type="personal" />
						<Message type="sender" />
						<Message type="personal" />
						<Message type="sender" />
						<Message type="personal" />
						<Message type="sender" />
						<Message type="personal" />
					</div>
					<div className="messages__send-wrapp">
						<UiInput
							onChange={() => {}}
							value=""
							className="messages__input-wrapp"
							placeholder="Message"
						/>
						<UiButton icon={<i className="bx bx-microphone"></i>} label="" onClick={() => {}} />
					</div>
				</div>
			</div>
		</div>
	);
};

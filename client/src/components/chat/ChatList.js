import React, { useState, useEffect, useContext } from "react";
import ChatContext from "../../contexts/ChatContext";

const ChatList = () => {
	const socket = useContext(ChatContext);
	const [chats, setChats] = useState([]);
	useEffect(() => {
		socket &&
			socket.on("message", message => setChats([...chats, message]));
	}, [socket, chats]);
	useEffect(() => {
		return () => socket?.disconnect();
	}, [socket]);
	return (
		<div>
			{chats.map((chat, index) => (
				<p key={index}>{chat}</p>
			))}
		</div>
	);
};

export default ChatList;

import React, { useState, useEffect, useContext } from "react";
import ChatContext from "../../contexts/ChatContext";
import { Grid } from "@material-ui/core";

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
		<Grid container direction={`column`}>
			{chats.map((chat, index) => (
				<p key={index}>{chat}</p>
			))}
		</Grid>
	);
};

export default ChatList;

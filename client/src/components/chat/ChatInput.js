import React, { useState, useContext } from "react";
import ChatContext from "../../contexts/ChatContext";
import { Input } from "@material-ui/core";

const ChatInput = () => {
	const [input, setInput] = useState("");
	const socket = useContext(ChatContext);
	const handleSubmit = e => {
		e.preventDefault();
		input.trim() && socket.emit("chatMessage", input.trim());
		setInput("");
	};
	return (
		<form onSubmit={handleSubmit}>
			<Input
				autoFocus
				fullWidth
				type="text"
				value={input}
				placeholder={`Message`}
				onChange={e => setInput(e.target.value)}
			/>
		</form>
	);
};

export default ChatInput;

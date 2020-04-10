import React, { useState, useContext } from "react";
import ChatInput from "./ChatInput";
import { Grid } from "@material-ui/core";
import ChatList from "./ChatList";
// import ChatContext from "../../contexts/ChatContext";

const Chat = () => {
	return (
		<Grid container direction={`column`}>
			<ChatList />
			<ChatInput />
		</Grid>
	);
};

export default Chat;

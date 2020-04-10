import React, { useState, useEffect, useRef } from "react";
import flv from "flv.js";
import { useSelector, useDispatch } from "react-redux";
import { fetchStream } from "../../actions";
import { useParams } from "react-router-dom";
import Chat from "../chat/Chat";
import { ChatProvider } from "../../contexts/ChatContext";
import socketIOClient from "socket.io-client";
import { Grid, Paper } from "@material-ui/core";

const StreamShow = () => {
	let player = null;
	const params = useParams();
	const videoRef = useRef();
	const dispatch = useDispatch();
	const stream = useSelector(state => state.streams[params.id]);
	const [socket, setSocket] = useState(null);
	const buildPlayer = () => {
		if (player || !stream) {
			return;
		}
		const { id } = params;
		player = flv.createPlayer({
			type: "flv",
			url: `http://localhost:8000/live/${id}.flv`,
		});
		player.attachMediaElement(videoRef.current);
		player.load();
	};
	useEffect(() => {
		console.log(stream);
	}, [stream]);
	useEffect(() => {
		dispatch(fetchStream(params.id));
	}, [dispatch, params.id]);
	useEffect(() => {
		buildPlayer();
		return () => player && player.destroy();
	}, [player]);
	useEffect(() => {
		setSocket(socketIOClient(`http://localhost:5000`));
	}, []);
	useEffect(() => {
		socket && socket.on("message", message => console.log(message));
	}, [socket]);
	if (!stream) {
		return <div>Loading...</div>;
	}
	return (
		<ChatProvider value={socket}>
			<Grid container spacing={2}>
				<Grid item md={9}>
					<video
						ref={videoRef}
						style={{ width: "100%", borderRadius: 4 }}
						controls
					/>
				</Grid>
				<Grid
					item
					container
					direction={`column`}
					justify={`flex-end`}
					md={3}
				>
					<Chat />
				</Grid>
			</Grid>
			<h1>{stream?.title}</h1>
			<h5>{stream?.description}</h5>
		</ChatProvider>
	);
};

export default StreamShow;

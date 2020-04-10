const http = require("http");
const socketio = require("socket.io");
const app = require("express")();
const server = http.createServer(app);
const io = socketio(server);

// Run when client connects
io.on("connection", (socket) => {
	console.log(`new WS connection`);

	socket.emit("message", "Welcome to the chat");
	// Broadcast when a user connects to the chat
	socket.broadcast.emit("message", "A user has joined the chat");
	// listen for chat message
	socket.on("chatMessage", (message) => {
		io.emit("message", message);
	});
	// Run when user disconnects
	socket.on("disconnect", () => {
		io.emit("message", "A user has left the chat");
	});
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

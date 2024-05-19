const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

const socketRoute = require("./src/routes/socket.route");
const { appendSocket } = require("./src/middlewares/socket.middleware");

const websocket = new Server(server, {
	cors: {
		origin: "*",
	},
});

dotenv.config({
	path: "./.env",
});

// /**
//  *connect to db
//  */

// start server
const PORT = process.env.PORT;

// io.on("connection", (socket) => {
// 	console.log("user connected :: ", socket.id);
// });

app.use(cors("*"));
app.use(
	express.json({
		limit: "15kb",
	}),
);

// app.use((req, res, next) => {
// 	req.io = websocket;
// 	next();
// });

//
websocket.on("connection", (socket) => {
	app.use(appendSocket(socket));
	app.use("/io", socketRoute);

	// socket.on("send_message", (roomId, data) => {
	// 	console.log("SENDING TO ROOM :: ", roomId, data);
	// 	if (roomId) socket.to(roomId).emit("receieve_message", { ...data });
	// 	// else socket.broadcast.emit("receieve_message", { ...data });
	// });

	socket.on("join-room", (room) => {
		console.log("ROOM JOINED :: ", room);
		socket.join(room);
	});
	console.log(socket.id);
});

server.listen(PORT, () => {
	console.log(`server running at ${PORT}`);
});

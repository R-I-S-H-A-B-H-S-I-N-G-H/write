import { useEffect, useRef, useState } from "react";
import Editor from "./components/Editor/Editor";
import Editorjs from "./components/Editor/Editorjs/Editorjs";
import LexicalEditor from "./components/Editor/LexicalEditor/LexicalEditor";
import SlateEditor from "./components/Editor/Slate/Slate";
import SunEditorWrapper from "./components/Editor/SunEditor/SunEditorWrapper";
import TipTap from "./components/Editor/TipTap/TipTap";
import axios from "axios";
import config from "../configs/config";

const io = require("socket.io-client");
const socket = io.connect(config.BASE_URL);

export default function App(params) {
	const socketId = useRef();
	const [delta, setDelta] = useState();
	const roomidRef = useRef(socket.id);

	useEffect(() => {
		socket.on("connect", async () => {
			console.log("Successfully connected!", socket.id);
			socketId.current = socket.id;
		});

		socket.on("receieve_message", (socketMsg) => {
			const { id, data } = socketMsg;
			if (id == socketId.current) return;
			setDelta(data);
		});
	}, []);

	function joinRoom(room) {
		console.log("JOIN ROOM", room);
		socket.emit("join-room", room);
	}

	async function sendMessage(changes) {
		await axios.post(`${config.BASE_URL}/io/${roomidRef.current.value}`, { id: socketId.current, data: changes });
		// socket.emit("send_message", roomidRef.current.value, { id: socketId.current, data: changes });
	}

	function roomIdChange() {
		const val = roomidRef.current.value;
		console.log(val);
		joinRoom(val);
	}

	return (
		<>
			<input placeholder="enter docname" ref={roomidRef} />
			<button onClick={roomIdChange}>Join Room</button>
			<Editor delta={delta} onChange={sendMessage} />
			{/* <Editor /> */}
			{/* <Editor toolbarId="#toolbar" /> */}
			{/* <TipTap /> */}
			{/* <SlateEditor /> */}
			{/* <Editorjs /> */}
			{/* <LexicalEditor /> */}
			{/* <SunEditorWrapper /> */}
			{/* <Medium /> */}
		</>
	);
}

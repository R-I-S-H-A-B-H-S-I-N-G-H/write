import { useEffect, useRef, useState } from "react";
import Editor from "./components/Editor/Editor";
import Editorjs from "./components/Editor/Editorjs/Editorjs";
import LexicalEditor from "./components/Editor/LexicalEditor/LexicalEditor";
import SlateEditor from "./components/Editor/Slate/Slate";
import SunEditorWrapper from "./components/Editor/SunEditor/SunEditorWrapper";
import TipTap from "./components/Editor/TipTap/TipTap";
import axios from "axios";

const io = require("socket.io-client");
const socket = io.connect("http://localhost:3000");

export default function App(params) {
	const socketId = useRef();
	const [delta, setDelta] = useState();

	useEffect(() => {
		socket.on("connect", () => {
			console.log("Successfully connected!", socket.id);
			socketId.current = socket.id;
		});

		socket.on("receieve_message", (socketMsg) => {
			const { id, data } = socketMsg;
			if (id == socketId.current) return;
			setDelta(data);
		});
	}, []);

	async function sendMessage(changes) {
		await axios.post("http://localhost:3000/io", { id: socketId.current, data: changes });
	}

	return (
		<>
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

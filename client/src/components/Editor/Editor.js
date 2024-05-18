import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./Editor.css";

// const TOOL_BAR_OPTIONS = {
// container: "#toolbar",
// handlers: [
// 	["bold", "italic", "underline", "strike"], // toggled buttons
// 	["blockquote", "code-block"],
// 	["link", "image", "video", "formula"],
// 	[{ header: 1 }, { header: 2 }], // custom button values
// 	[{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
// 	[{ script: "sub" }, { script: "super" }], // superscript/subscript
// 	[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
// 	[{ direction: "rtl" }], // text direction
// 	[{ size: ["small", false, "large", "huge"] }], // custom dropdown
// 	[{ header: [1, 2, 3, 4, 5, 6, false] }],
// 	[{ color: [] }, { background: [] }], // dropdown with defaults from theme
// 	[{ font: [] }],
// 	[{ align: [] }],
// 	["clean"], // remove formatting button
// ],
// };

const TOOL_BAR_OPTIONS = [
	["bold", "italic", "underline", "strike"], // toggled buttons
	["blockquote", "code-block"],
	["link", "image", "video", "formula"],

	[{ header: 1 }, { header: 2 }], // custom button values
	[{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
	[{ script: "sub" }, { script: "super" }], // superscript/subscript
	[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
	[{ direction: "rtl" }], // text direction

	[{ size: ["small", false, "large", "huge"] }], // custom dropdown
	[{ header: [1, 2, 3, 4, 5, 6, false] }],

	[{ color: [] }, { background: [] }], // dropdown with defaults from theme
	[{ font: [] }],
	[{ align: [] }],

	["clean"], // remove formatting button
];

export default function Editor(props) {
	const { toolbarId } = props;
	const toolbarOptions = useRef(TOOL_BAR_OPTIONS);
	const EDITOR_CONTAINER_ID = "editorContainer";
	const editorWrapperRef = useRef();

	const [quill, setQuill] = useState();

	useEffect(() => {
		if (!quill) return;
		quill.on("text-change", (delta, oldDelta, src) => {
			// console.log(delta, oldDelta, src);
			let length = quill.getLength();
			let lines = quill.getLines(0, length);
			console.log(lines.length);
		});
	}, [quill]);

	useEffect(() => {
		if (!editorWrapperRef.current) return;

		const editor = document.createElement("div");
		editorWrapperRef.current.append(editor);

		const q = new Quill(editor, {
			theme: "snow",
			modules: {
				// toolbar: toolbarId || toolbarOptions.current,
				toolbar: toolbarOptions.current,
			},
		});
		setQuill(q);
		return () => {
			//clean up function
			editor.innerHTML = "";
		};
	}, []);
	return (
		<>
			<div id="toolbar"></div>
			<div className="editorWrapper" ref={editorWrapperRef}></div>
			{/* more editors here */}
		</>
	);
}

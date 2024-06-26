import React, { useState } from "react";
import { createEditor } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

const initialValue = [
	{
		type: "paragraph",
		children: [{ text: "A line of text in a paragraph." }],
	},
];

const SlateEditor = () => {
	const [editor] = useState(() => withReact(createEditor()));
	return (
		// Add the editable component inside the context.
		<Slate editor={editor} initialValue={initialValue}>
			<Editable />
		</Slate>
	);
};

export default SlateEditor;

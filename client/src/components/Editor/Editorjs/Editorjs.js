import React from "react";
import { createReactEditorJS } from "react-editor-js";
import CheckList from "@editorjs/checklist";

export const EDITOR_JS_TOOLS = {
	// NOTE: Paragraph is default tool. Declare only when you want to change paragraph option.
	// paragraph: Paragraph,
	checklist: CheckList,
};

export default function Editorjs() {
	const ReactEditorJS = createReactEditorJS();
	return <ReactEditorJS defaultValue={"hello"} tools={EDITOR_JS_TOOLS} />;
}

import { useState } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

function TextEditor() {
  const [value, setValue] = useState("");

  return (
    <>
      <h1>Texteditor</h1>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </>
  );
}

export default TextEditor;

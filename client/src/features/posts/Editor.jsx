import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link"],
    ["clean"]
  ]
}
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link"
]
function Editor({ content, setContent }) {
  // console.log(content)
  return (
    <ReactQuill
      placeholder="Write your post content here..."
      theme="snow"
      value={content}
      onChange={setContent}
      modules={modules}
      formats={formats}
    />
  )
}

export default Editor

import { type SetStateAction } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RichTextBoxProps {
  comment?: string;
  setComment: React.Dispatch<SetStateAction<string>>;
}
export default function RichTextBox({ setComment, comment }: RichTextBoxProps) {
  return <ReactQuill theme="snow" value={comment} onChange={setComment} />;
}

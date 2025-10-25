import { FaEdit } from "react-icons/fa";
import { Button } from "../ui/button";

interface IButtonEdit {
  onClick: () => void;
  text?: string;
}

export default function ButtonEdit({ onClick, text }: IButtonEdit) {
  return (
    <Button
      title="Edit"
      onClick={onClick}
      className="bg-yellow-400 hover:bg-yellow-400/80 flex gap-2"
    >
      <FaEdit />
      {text}
    </Button>
  );
}

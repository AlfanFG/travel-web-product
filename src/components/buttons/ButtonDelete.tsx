import { FaTrash } from "react-icons/fa";
import { Button } from "../ui/button";

interface IButtonDelete {
  onClick?: () => void;
  text?: string;
}

export default function ButtonDelete({ onClick, text }: IButtonDelete) {
  return (
    <Button
      title="Edit"
      onClick={onClick}
      className="bg-red-600 hover:bg-red-600/80 flex gap-2"
    >
      <FaTrash />
      {text}
    </Button>
  );
}

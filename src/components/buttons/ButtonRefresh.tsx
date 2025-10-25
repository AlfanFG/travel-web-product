import { FaRedo } from "react-icons/fa";
import { Button } from "../ui/button";

interface IButtonRefresh {
  onClick: () => void;
  text?: string;
}

export default function ButtonRefresh({ onClick, text }: IButtonRefresh) {
  return (
    <Button
      title="Edit"
      variant={"ghost"}
      onClick={onClick}
      className="text-gray-500 flex "
    >
      <FaRedo />
      {text}
    </Button>
  );
}

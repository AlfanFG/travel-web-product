import { FaPlusCircle } from "react-icons/fa";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface IButtonAdd {
	text?: string;
	click: () => void;
	className?: string;
}

export default function ButtonAdd(props: IButtonAdd) {
	const { click, text, className } = props;
	return (
		<Button
			title="Add"
			onClick={click}
			className={cn(
				`bg-secondary hover:bg-secondary/90 flex items-center gap-2`,
				className
			)}
		>
			<FaPlusCircle />
			{text}
		</Button>
	);
}

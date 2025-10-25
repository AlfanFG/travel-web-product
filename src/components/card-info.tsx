import type { ReactNode } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import Zoom from "react-medium-image-zoom";

interface ICardInfo {
	title?: string | ReactNode;
	description?: string | ReactNode;
	children: ReactNode;
	footer?: string | ReactNode;
	imgCover?: ReactNode;
}

export default function CardInfo({
	title,
	description,
	children,
	footer,
	imgCover,
}: ICardInfo) {
	return (
		<Card>
			<Zoom>
				<div className="relative">{imgCover}</div>
			</Zoom>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>
					<span>{description}</span>
				</CardDescription>
			</CardHeader>
			<CardContent className="text-pretty wrap-break-word">
				{children}
			</CardContent>
			<CardFooter>{footer}</CardFooter>
		</Card>
	);
}

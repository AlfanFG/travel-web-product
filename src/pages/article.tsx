import ListArticle from "@/feature/article/ListArticle";
import { useNavigate, useSearchParams } from "react-router-dom";
import PreviewArticle from "./PreviewArticle";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
export default function Article() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	const scrollToSection = () => {
		sectionRef.current?.scrollIntoView({ behavior: "smooth" });
	};
	const [searchParams] = useSearchParams();
	return (
		<div className="h-full w-full p-4 rounded-md">
			<div className="flex justify-between">
				<p className="text-2xl font-bold ml-6">Article</p>
				<Button variant={"ghost"} onClick={() => navigate(-1)}>
					<ArrowLeft />
				</Button>
			</div>
			{searchParams.get("mode") === "preview" ? (
				<PreviewArticle ref={sectionRef} />
			) : (
				<ListArticle onTriggerScroll={scrollToSection} />
			)}
		</div>
	);
}

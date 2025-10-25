import ImageNotFound from "@/assets/page-notfound.png";

export default function NotFound() {
	return (
		<div className="flex justify-center items-center w-full p-4">
			<img src={ImageNotFound} />
		</div>
	);
}

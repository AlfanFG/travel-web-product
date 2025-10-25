import NoData from "@/assets/no-data.png";

export default function NotFound() {
	return (
		<div className="flex flex-col gap-2 w-full px-6 py-6">
			<img src={NoData} alt="empty" className="w-20 my-2 mx-auto" />
			<p className="text-center text-lg font-bold">No Data Found</p>
		</div>
	);
}

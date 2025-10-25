import ButtonBack from "@/components/buttons/ButtonBack";
import ListCategory from "@/feature/category/ListCategory";

export default function Category() {
	return (
		<div className="w-full p-4 rounded-md">
			<div className="flex justify-between">
				<p className="text-2xl font-bold ml-6">Category</p>
				<ButtonBack />
			</div>
			<ListCategory />
		</div>
	);
}

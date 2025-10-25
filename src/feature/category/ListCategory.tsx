import { useEffect, useState } from "react";

import { useFetchCategory } from "./hooks/useFetchCategory";

import TableCategory from "./TableCategory";
import { useGetPagination } from "@/stores/paginationStore";

import ButtonAdd from "@/components/buttons/ButtonAdd";
import useModalForm from "@/hooks/useModalForm";
import CategoryForm from "./CategoryForm";
import FilterData, { type listFilter } from "@/components/FilterData";
import { useSetLoading } from "@/stores/loadingStore";
import ButtonRefresh from "@/components/buttons/ButtonRefresh";
import { cn } from "@/lib/utils";
import useResponsive from "@/hooks/useResponsive";

export default function ListCategory() {
	const [search, setSearch] = useState<string | undefined>();
	const loading = useSetLoading();
	const { isMobile } = useResponsive();
	const pagination = useGetPagination();
	const listFilter: listFilter = [
		{
			label: "Search Category",
			name: "category",
			placeholder: "Search by name",
			type: "text",
			setFilter: setSearch,
		},
	];
	const {
		data: categories,
		isPending,
		refetch,
	} = useFetchCategory(pagination.pageIndex, pagination.pageSize, search);

	useEffect(() => {
		if (isPending) loading(true);
		if (!isPending) loading(false);
	}, [isPending]);

	const { createModalForm, showModal, hideModal } =
		useModalForm("Add Category");

	return (
		<div className="flex flex-col gap-2 w-full px-6 py-6">
			<div
				className={cn(
					"flex gap-4 bg-white items-end w-full flex-col xl:flex-row xl:justify-between p-6 rounded-md"
				)}
			>
				<div className="flex flex-col xl:flex-row gap-4 w-full">
					<FilterData listFilter={listFilter} />
				</div>
				<div className="flex gap-2 w-full justify-end pl-10">
					<ButtonRefresh onClick={refetch} />
					<ButtonAdd
						text="Add Category"
						click={showModal}
						className="flex items-center gap-2 w-full sm:w-fit"
					/>
				</div>
			</div>

			<div className={cn("w-full rounded-md", isMobile ? "" : "bg-white p-4")}>
				<TableCategory
					categories={categories?.data ?? []}
					meta={
						categories?.meta ?? {
							pagination: { page: 1, pageSize: 10, pageCount: 1, total: 0 },
						}
					}
				/>
			</div>
			{createModalForm(<CategoryForm hideModal={hideModal} />)}
		</div>
	);
}

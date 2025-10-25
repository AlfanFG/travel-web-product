import React from "react";

import {
	type Column,
	type Table as ReactTable,
	flexRender,
	type ColumnMeta,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import { usePageIndex, usePageSize } from "@/stores/paginationStore";
import PaginationTools from "./PaginationTools";
import useResponsive from "@/hooks/useResponsive";
import { CardContent, CardHeader, Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { useGetLoading } from "@/stores/loadingStore";
import Loading from "./ui/loading";
import NotFound from "./NotFound";

interface ITableData<T extends { id: string }> {
	table: ReactTable<T>;
	totalData: number;
	totalPage: number;
	isPendingRow?: boolean;
	currentId?: string;
}

export default function TableData<
	T extends { id: string; documentId: string }
>({ table, totalData, totalPage, isPendingRow, currentId }: ITableData<T>) {
	const isLoading = useGetLoading();
	const page = table.getState().pagination.pageIndex;
	const pageSize = table.getState().pagination.pageSize;
	const setPageIndex = usePageIndex();
	const setPageSize = usePageSize();
	const { isMobile } = useResponsive();

	return (
		<div className="p-2">
			{isMobile ? (
				<div className="flex flex-col gap-4 ">
					{table.getRowModel().rows.map((row, index) => {
						return (
							<Card key={row.id}>
								<CardHeader></CardHeader>
								<CardContent>
									{table.getHeaderGroups().map((headerGroup) => (
										<div className="flex gap-4" key={headerGroup.id}>
											<div className="flex flex-col gap-2">
												{headerGroup.headers.map((header) => {
													if (header.id !== "action")
														return (
															<div
																key={header.id}
																className="flex gap-4 justify-between"
															>
																<p className="h-6 self-start">
																	{header.isPlaceholder
																		? null
																		: flexRender(
																				header.column.columnDef.header,
																				header.getContext()
																		  )}
																</p>
																<span> : </span>
															</div>
														);
												})}
											</div>
											<div className="flex flex-col gap-2">
												{row.getVisibleCells().map((cell) => {
													return (
														<p className="h-full" key={cell.id}>
															{cell.column.id === "No"
																? index + 1 + (page - 1) * pageSize
																: flexRender(
																		cell.column.columnDef.cell,
																		cell.getContext()
																  )}
														</p>
													);
												})}
											</div>
										</div>
									))}
								</CardContent>
							</Card>
						);
					})}
				</div>
			) : (
				<div className="overflow-auto max-h-[60vh] ">
					<Table noWrapper className="relative w-full">
						<TableHeader className="sticky top-0 bg-white z-10">
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id} colSpan={header.colSpan}>
												{header.isPlaceholder ? null : (
													<>
														<div
															{...{
																className: header.column.getCanSort()
																	? "cursor-pointer select-none"
																	: "",
																onClick:
																	header.column.getToggleSortingHandler(),
															}}
														>
															{flexRender(
																header.column.columnDef.header,
																header.getContext()
															)}
															{{
																asc: " 🔼",
																desc: " 🔽",
															}[header.column.getIsSorted() as string] ?? null}
														</div>
														{header.column.getCanFilter() ? (
															<div>
																<Filter column={header.column} />
															</div>
														) : null}
													</>
												)}
											</TableHead>
										);
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{isLoading ? (
								<TableRow>
									<TableCell
										className="text-center p-4"
										colSpan={table.getHeaderGroups()[0]?.headers.length || 1}
									>
										<Loading />
									</TableCell>
								</TableRow>
							) : table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row, index) => {
									return (
										<TableRow
											key={row.id}
											className={cn(
												isPendingRow &&
													currentId === row.original.documentId &&
													`opacity-60`
											)}
										>
											{row.getVisibleCells().map((cell) => {
												return (
													<TableCell key={cell.id}>
														<p className="text-pretty wrap-break-word">
															{cell.column.id === "No"
																? index + 1 + (page - 1) * pageSize
																: flexRender(
																		cell.column.columnDef.cell,
																		cell.getContext()
																  )}
														</p>
													</TableCell>
												);
											})}
										</TableRow>
									);
								})
							) : (
								<TableRow>
									<TableCell
										colSpan={table.getHeaderGroups()[0]?.headers.length || 1}
									>
										{" "}
										<NotFound />
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			)}

			<div className="h-2" />
			<div className="flex items-center gap-2">
				{totalData ? (
					<PaginationTools
						currentPage={table.getState().pagination.pageIndex}
						itemsPerPage={table.getState().pagination.pageSize}
						onPageChange={setPageIndex}
						onPageSizeChange={setPageSize}
						totalItems={totalData}
						totalPages={totalPage}
					/>
				) : null}
			</div>
		</div>
	);
}
type FilterVariant = "range" | "select" | "text";

interface CustomColumnMeta<TData = unknown, TValue = unknown>
	extends ColumnMeta<TData, TValue> {
	filterVariant?: FilterVariant;
}

function Filter<T>({ column }: { column: Column<T, unknown> }) {
	const columnFilterValue = column.getFilterValue();
	const { filterVariant } = (column.columnDef.meta as CustomColumnMeta) ?? {};

	return filterVariant === "range" ? (
		<div>
			<div className="flex space-x-2">
				{/* See faceted column filters example for min max values functionality */}
				<DebouncedInput
					type="number"
					value={(columnFilterValue as [number, number])?.[0] ?? ""}
					onChange={(value) =>
						column.setFilterValue((old: [number, number]) => [value, old?.[1]])
					}
					placeholder={`Min`}
					className="w-24 border shadow rounded"
				/>
				<DebouncedInput
					type="number"
					value={(columnFilterValue as [number, number])?.[1] ?? ""}
					onChange={(value) =>
						column.setFilterValue((old: [number, number]) => [old?.[0], value])
					}
					placeholder={`Max`}
					className="w-24 border shadow rounded"
				/>
			</div>
			<div className="h-1" />
		</div>
	) : filterVariant === "select" ? (
		<select
			onChange={(e) => column.setFilterValue(e.target.value)}
			value={columnFilterValue?.toString()}
		>
			{/* See faceted column filters example for dynamic select options */}
			<option value="">All</option>
			<option value="complicated">complicated</option>
			<option value="relationship">relationship</option>
			<option value="single">single</option>
		</select>
	) : (
		<DebouncedInput
			className="w-36 border shadow rounded"
			onChange={(value) => column.setFilterValue(value)}
			placeholder={`Search...`}
			type="text"
			value={(columnFilterValue ?? "") as string}
		/>
		// See faceted column filters example for datalist search suggestions
	);
}

// A typical debounced input react component
function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 500,
	...props
}: {
	value: string | number;
	onChange: (value: string | number) => void;
	debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
	const [value, setValue] = React.useState(initialValue);

	React.useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [value]);

	return (
		<input
			{...props}
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	);
}

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

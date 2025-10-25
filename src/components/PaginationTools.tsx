import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "./ui/button";
import {
	BsChevronDoubleLeft,
	BsChevronDoubleRight,
	BsChevronLeft,
	BsChevronRight,
} from "react-icons/bs";

type Props = {
	totalItems: number;
	itemsPerPage: number;
	currentPage: number;
	onPageChange: (page: number) => void;
	onPageSizeChange: (page: number) => void;
	totalPages: number;
	siblingCount?: number; // how many pages to show on each side of current
};

export default function PaginationTools({
	totalItems,
	itemsPerPage,
	currentPage,
	onPageChange,
	onPageSizeChange,
	totalPages,

	siblingCount = 1,
}: Props) {
	const range = (start: number, end: number) =>
		Array.from({ length: end - start + 1 }, (_, i) => i + start);

	const DOTS = "...";

	const getPaginationRange = () => {
		const totalPageNumbers = siblingCount * 2 + 5;

		if (totalPageNumbers >= totalPages) {
			return range(1, totalPages);
		}

		const leftSibling = Math.max(currentPage - siblingCount, 1);
		const rightSibling = Math.min(currentPage + siblingCount, totalPages);

		const showLeftDots = leftSibling > 2;
		const showRightDots = rightSibling < totalPages - 2;

		const firstPage = 1;
		const lastPage = totalPages;

		if (!showLeftDots && showRightDots) {
			const leftRange = range(1, 3 + 2 * siblingCount);
			return [...leftRange, DOTS, totalPages];
		}

		if (showLeftDots && !showRightDots) {
			const rightRange = range(totalPages - (2 + 2 * siblingCount), totalPages);
			return [firstPage, DOTS, ...rightRange];
		}

		if (showLeftDots && showRightDots) {
			const middleRange = range(leftSibling, rightSibling);
			return [firstPage, DOTS, ...middleRange, DOTS, lastPage];
		}

		return [];
	};

	const paginationRange = getPaginationRange();

	const handlePageChange = (page: number) => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		onPageChange(page);
	};

	return (
		<Pagination>
			<PaginationContent className="flex xl:flex-row justify-between gap-6 flex-col-reverse w-full py-4">
				<div className="flex flex-wrap">
					{" "}
					<span className="flex items-center gap-1">
						<div>Page</div>
						<strong>
							{currentPage || 1} of {totalPages || 1}
						</strong>
						|<div>{totalItems} Rows</div>
					</span>
				</div>
				<div className="flex gap-2">
					<PaginationItem>
						<Button
							variant={"ghost"}
							className="border rounded h-8"
							onClick={() => onPageChange(currentPage - 2)}
							disabled={!(currentPage > 2)}
						>
							<BsChevronDoubleLeft />
						</Button>
					</PaginationItem>
					<PaginationItem>
						<Button
							variant={"ghost"}
							className="border rounded h-8"
							onClick={() => onPageChange(currentPage - 1)}
							disabled={currentPage === 1}
						>
							<BsChevronLeft />
						</Button>
					</PaginationItem>

					{paginationRange.map((page, idx) => (
						<PaginationItem key={idx}>
							{page === DOTS ? (
								<span className="px-3 py-1 text-muted-foreground">…</span>
							) : (
								<button
									onClick={() => handlePageChange(Number(page))}
									className={`px-3 py-1 rounded ${
										currentPage === page
											? "bg-secondary text-white"
											: "hover:bg-muted"
									}`}
								>
									{page}
								</button>
							)}
						</PaginationItem>
					))}

					<PaginationItem>
						<Button
							variant={"ghost"}
							className="border rounded h-8"
							onClick={() => onPageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
						>
							<BsChevronRight />
						</Button>
					</PaginationItem>
					<PaginationItem>
						<Button
							variant={"ghost"}
							className="border rounded h-8"
							onClick={() => onPageChange(currentPage + 2)}
							disabled={!(currentPage < totalPages - 1)}
						>
							<BsChevronDoubleRight />
						</Button>
					</PaginationItem>
				</div>
				<div className="flex gap-2 flex-wrap items-center justify-center">
					<span className="flex items-center gap-1">
						Go to page:
						<input
							type="number"
							min="1"
							max={totalPages}
							defaultValue={currentPage}
							onChange={(e) => {
								const page = Number(e.target.value);
								onPageChange(page);
							}}
							className="border p-1 rounded w-16"
						/>
					</span>
					<select
						value={itemsPerPage}
						onChange={(e) => {
							onPageChange(currentPage);
							onPageSizeChange(Number(e.target.value));
						}}
					>
						{[5, 10, 20, 30, 40, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select>
				</div>
			</PaginationContent>
		</Pagination>
	);
}

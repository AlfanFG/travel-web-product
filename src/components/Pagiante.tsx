import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
	totalItems: number;
	itemsPerPage: number;
	currentPage: number;
	onPageChange: (page: number) => void;
	siblingCount?: number; // how many pages to show on each side of current
};

export default function Paginate({
	totalItems,
	itemsPerPage,
	currentPage,
	onPageChange,
	siblingCount = 1,
}: Props) {
	const totalPages = Math.ceil(totalItems / itemsPerPage);

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

	const handlePrevious = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		if (currentPage > 1) handlePageChange(currentPage - 1);
	};

	const handleNext = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		if (currentPage < totalPages) handlePageChange(currentPage + 1);
	};

	const handlePageChange = (page: number) => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		onPageChange(page);
	};

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={handlePrevious}
						className={
							currentPage === 1 ? "pointer-events-none opacity-50" : ""
						}
					/>
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
					<PaginationNext
						onClick={handleNext}
						className={
							currentPage === totalPages ? "pointer-events-none opacity-50" : ""
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}

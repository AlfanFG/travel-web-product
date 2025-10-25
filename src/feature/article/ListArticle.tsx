import { useFetchArticles } from "./hooks/useFetchArticles";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaComment, FaEdit, FaTrash } from "react-icons/fa";
import CardInfo from "@/components/card-info";

import ImageNotFound from "@/assets/image-notfound.png";
import Loading from "@/components/ui/loading";
import NotFound from "@/components/NotFound";
import Paginate from "@/components/Pagiante";
import ArticleForm from "./ArticleForm";

import { useDeleteArticles } from "./hooks/useDeleteArticles";
import { ButtonConfirmation } from "@/components/buttons/confirmation-button";
import useModalForm from "@/hooks/useModalForm";
import { formatDate, getImageLink } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import FilterData, { type listFilter } from "@/components/FilterData";
import { useSearchParams } from "react-router-dom";
import { useArticleActions } from "@/stores/articleStore";
import type { IArticles } from "./hooks";
import ButtonRefresh from "@/components/buttons/ButtonRefresh";
import ButtonAdd from "@/components/buttons/ButtonAdd";

type IListArticle = {
	onTriggerScroll: () => void;
};
export default function ListArticle({ onTriggerScroll }: IListArticle) {
	const [search, setSearch] = useState<string | undefined>();
	const setArticle = useArticleActions();
	const [, setSearchParams] = useSearchParams();
	const [page, setPage] = useState(1);
	const [category, setCategory] = useState<string | undefined>();
	const [articleId, setArticleId] = useState("");
	const {
		data: articles,
		isPending: isLoadArticle,
		refetch,
	} = useFetchArticles({
		page,
		limit: 12,
		title: search,
		category,
	});
	const listFilter: listFilter = [
		{
			label: "Search Category",
			name: "category",
			placeholder: "Search by name",
			type: "select-category",
			valueName: "name",
			setFilter: setCategory,
		},
		{
			label: "Search Article",
			name: "article",
			placeholder: "Search by title",
			type: "text",
			refetch: refetch,
			setFilter: setSearch,
		},
	];
	const { createModalForm, showModal, hideModal } = useModalForm("Add Article");
	const {
		createModalForm: editModalForm,
		showModal: showEdit,
		hideModal: hideEdit,
	} = useModalForm("Edit Article");

	const { mutate: mutateDelete, isPending: isPendingDelete } =
		useDeleteArticles();

	const handlePreviewArticle = (article: IArticles) => {
		setSearchParams({ mode: "preview" });
		setArticle(article);
	};

	return (
		<div className="flex flex-col gap-2 w-full px-6 py-6">
			<div className="flex gap-4 items-end bg-white w-full flex-col xl:flex-row xl:justify-between p-6 rounded-md">
				<div className="flex flex-col xl:flex-row gap-4 w-full">
					<FilterData listFilter={listFilter} />
				</div>
				<div className="flex gap-2 w-full justify-end pl-10">
					<ButtonRefresh onClick={refetch} />
					<ButtonAdd
						text="Add Article"
						click={showModal}
						className="flex items-center gap-2 w-full sm:w-fit"
					/>
				</div>
			</div>
			{(isLoadArticle || isPendingDelete) && <Loading />}

			{!articles?.data?.length && !isLoadArticle && (
				<div className="bg-white w-full h-full p-6">
					<NotFound />
				</div>
			)}

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-4 gap-4">
				{articles?.data?.map((article) =>
					articleId === article.documentId && isPendingDelete ? (
						<Skeleton key={article.documentId} className="rounded-xl" />
					) : (
						<CardInfo
							key={article.id}
							title={article.title}
							description={formatDate(article.createdAt)}
							imgCover={
								<>
									<img
										src={getImageLink(article?.cover_image_url)}
										alt={article.title}
										className="w-full h-48 object-cover rounded-md"
									/>
									<div className="absolute top-0 left-0 w-full pt-2 pr-2 gap-2  flex justify-end">
										<Button
											className="bg-secondary hover:bg-secondary/80"
											title="Edit"
											onClick={() => {
												setArticleId(article.documentId);
												showEdit();
											}}
										>
											<FaEdit></FaEdit>
										</Button>
										<ButtonConfirmation
											description="This action cannot be undone. This will  delete your data!"
											confirm={() => {
												mutateDelete({ documentId: article.documentId });
												setArticleId(article.documentId);
											}}
											button={
												<Button className="bg-red-700 hover:bg-red-700">
													<FaTrash />
												</Button>
											}
										/>
									</div>
								</>
							}
							footer={
								<div className="flex gap-2 justify-end">
									<Button
										onClick={() => {
											handlePreviewArticle(article);
											onTriggerScroll();
										}}
										variant={"ghost"}
									>
										<FaComment className="text-primary" />
									</Button>
									<Button
										onClick={() => {
											handlePreviewArticle(article);
										}}
									>
										Read More
									</Button>
								</div>
							}
						>
							<p className="line-clamp-3">{article.description}</p>
						</CardInfo>
					)
				)}
				{createModalForm(<ArticleForm hideModal={hideModal} />)}
				{editModalForm(<ArticleForm id={articleId} hideModal={hideEdit} />)}
			</div>

			{!isLoadArticle && (
				<Paginate
					totalItems={articles?.meta?.pagination?.total ?? 0}
					itemsPerPage={articles?.meta?.pagination?.pageSize ?? 10}
					currentPage={page}
					onPageChange={setPage}
				/>
			)}
		</div>
	);
}

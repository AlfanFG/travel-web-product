import CommentBox from "@/components/CommentBox";
import RichTextBox from "@/components/input/RichTextBox";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { useDeleteComment } from "@/feature/comments/hooks/useDeleteComment";
import { useFetchComments } from "@/feature/comments/hooks/useFetchComments";
import { usePutComment } from "@/feature/comments/hooks/usePutComment";
import { usePostComments } from "@/feature/comments/usePostComment";
import { useArticle } from "@/stores/articleStore";

import moment from "moment";
import { forwardRef, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Zoom from "react-medium-image-zoom";

export default forwardRef<HTMLDivElement>(function PreviewArticle(_, ref) {
	const article = useArticle();
	const { data: comments, isPending } = useFetchComments({
		articleDocId: article.documentId,
		populateUser: true,
	});
	const { mutate: mutateDelete, isPending: isPendingDelete } =
		useDeleteComment();
	const [comment, setComment] = useState("");
	const [commentEdit, setCommentEdit] = useState("");
	const [commentId, setCommentId] = useState("");
	const [isEdit, setIsEdit] = useState(false);
	const handleScroll = () => {
		window.scrollBy({
			top: 500,
			behavior: "smooth",
		});
	};
	const { mutate, isPending: isPendingComment } = usePostComments();
	const { mutate: mutatePut, isPending: isPendingComUpdate } = usePutComment({
		afterSuccess: () => setIsEdit(false),
	});
	const onSubmit = () => {
		if (commentEdit) {
			mutatePut({
				data: {
					content: commentEdit,
				},
				documentId: commentId,
			});
		} else {
			mutate({
				data: {
					content: comment,
					article: article.documentId,
				},
			});
		}
		setComment("");
		setCommentId("");
	};

	useEffect(() => {
		if (comments) {
			setCommentEdit(
				comments?.data?.find((comment) => comment?.documentId === commentId)
					?.content ?? ""
			);
		}
	}, [comments, commentId]);

	return (
		<div className="flex flex-col bg-white p-10 ml-6 my-4 rounded-md overflow-auto min-h-screen">
			<p className="font-bold text-2xl capitalize">{article.title}</p>
			<p className="text-sm text-muted-foreground">
				{moment(article.createdAt).format("DD MMM YYYY - HH:MM")}
			</p>
			<div className="self-center w-2xl">
				<Zoom>
					<AspectRatio ratio={16 / 9}>
						<img
							src={article.cover_image_url}
							className="h-full w-full rounded-md object-cover"
						/>
					</AspectRatio>
				</Zoom>
			</div>
			<p className="my-4 text-justify">{article.description}</p>
			{isPending ? (
				<Loading />
			) : (
				<div ref={ref} className="flex flex-col gap-2">
					<Separator
						orientation="horizontal"
						className="mb-2 p-0.5 rounded-md"
					/>
					<p className="font-bold ml-2">Comments ({comments?.data?.length})</p>
					<Separator
						orientation="horizontal"
						className="mt-2 mb-4 p-0.5 rounded-md"
					/>
					<div className="flex flex-col gap-4">
						<RichTextBox comment={comment} setComment={setComment} />
						<Button
							disabled={isPendingComment || !comment}
							onClick={() => onSubmit()}
						>
							{isPendingComment ? <Loading /> : <>Post</>}
						</Button>
					</div>
					<Separator
						orientation="horizontal"
						className="my-2 p-0.5 rounded-2xl"
					/>
					{comments?.data?.length
						? comments?.data?.map((comment) => {
								return isPendingDelete && comment.documentId === commentId ? (
									<Skeleton
										key={comment.id}
										className="h-[125px] w-full rounded-xl"
									/>
								) : (
									<div className={"flex flex-col"} key={comment.id}>
										<CommentBox {...comment} />
										<div className="flex">
											<Button
												variant={"link"}
												onClick={() => {
													setIsEdit(true);
													window.scrollTo({
														top: 1000, // scrolls to 1000px from top
														behavior: "smooth", // or 'auto'
													});
													setCommentId(comment?.documentId);
												}}
												className="w-fit h-2 mb-2 ml-8"
											>
												Edit
											</Button>
											<Button
												variant={"link"}
												onClick={() => {
													setCommentId(comment?.documentId);
													mutateDelete({ documentId: comment?.documentId });
												}}
												className="w-fit h-2 mb-2"
											>
												Delete
											</Button>
										</div>

										{isEdit && commentId === comment?.documentId && (
											<div className="flex flex-col gap-4 bg-gray-100 rounded-lg pb-4 px-4">
												<Button
													className="self-end"
													onClick={() => {
														setIsEdit(false);
														setCommentEdit("");
														handleScroll();
													}}
													variant={"ghost"}
												>
													<MdClose />
												</Button>

												<RichTextBox
													comment={commentEdit}
													setComment={setCommentEdit}
												/>

												<Button
													className="w-fit self-end"
													disabled={isPendingComUpdate || !commentEdit}
													onClick={() => onSubmit()}
												>
													{isPendingComUpdate ? <Loading /> : <>Update</>}
												</Button>
											</div>
										)}
									</div>
								);
						  })
						: null}
				</div>
			)}
		</div>
	);
});

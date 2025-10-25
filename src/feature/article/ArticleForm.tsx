import InputText from "@/components/input/InputText";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SelectCategory from "../category/SelectCategory";
import InputTextArea from "@/components/input/InputTextarea";
import ImageUpload from "@/components/input/ImageUpload";
import { DialogFooter } from "@/components/ui/dialog";
import { usePostArticles } from "./hooks/usePostArticles";
import Loading from "@/components/ui/loading";
import type { ArticlesProps } from "./hooks";
import { useFetchArticleById } from "./hooks/useFetchArticlesById";
import { usePutArticles } from "./hooks/usePutArticles";
import API from "@/api/api";
import { useState } from "react";

export const articleSchema = z.object({
	title: z.string().min(1, { message: "Title is required!" }),
	description: z.string().min(1, { message: "Content is required!" }),
	category: z.string(),
	cover_image_url: z.string(),
});

interface IArticleForm {
	id?: string | undefined;
	hideModal: () => void;
}

export default function ArticleForm({ id, hideModal }: IArticleForm) {
	const [loading, setIsLoading] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const { data: article, isPending: IsPendingData } = useFetchArticleById(id);
	const { mutate: mutatePost, isPending } = usePostArticles({
		afterSuccess: hideModal,
	});
	const { mutate: mutatePut, isPending: isUpdatePending } = usePutArticles({
		afterSuccess: hideModal,
	});

	const { control, formState, handleSubmit, setValue, getValues, watch } =
		useForm({
			values: {
				title: article?.data?.title || "",
				description: article?.data?.description || "",
				category: article?.data?.category?.id || "", // Convert category to string
				cover_image_url: article?.data?.cover_image_url || "",
			},
			// resolver: zodResolver(articleSchema),
		});

	const { errors } = formState;
	const uploadImage = async (file: File | null) => {
		setIsLoading(true);
		if (!file) return;

		const formData = new FormData();
		formData.append("files", file);

		try {
			const response = await API.post("/upload", formData);
			setIsLoading(false);
			return response.data[0].url;
		} catch (error) {
			setIsLoading(false);
			console.error("Upload failed:", error);
		}
	};

	const onSubmit = async (values: ArticlesProps) => {
		const imageUrl = file ? await uploadImage(file) : values.cover_image_url;

		if (id) {
			mutatePut({
				data: { ...values, cover_image_url: imageUrl },
				documentId: id,
			});
		} else {
			mutatePost({
				data: { ...values, cover_image_url: imageUrl },
			});
		}
	};

	return IsPendingData && id ? (
		<Loading />
	) : (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-2 w-full"
		>
			<div className="flex flex-col gap-6 w-full px-6 pb-12 pt-4 relative">
				<ImageUpload
					value={watch("cover_image_url") && getValues("cover_image_url")}
					onChange={(value) => setFile(value as File)}
				/>
				<InputText
					id="title"
					error={errors?.title?.message}
					name="title"
					label="Title"
					placeholder="Add article title"
					control={control}
					hook
				/>

				<SelectCategory
					onChange={(value) => setValue("category", value)}
					error={errors.category?.message}
					control={control}
					value={String(watch("category") && getValues("category"))}
				/>

				<InputTextArea
					id="description"
					error={errors?.description?.message}
					name="description"
					label="Description"
					placeholder="Add article description"
					control={control}
					hook
				/>
			</div>
			<DialogFooter className="absolute bottom-2 right-0 w-full px-12 bg-white p-4">
				<Button
					disabled={isPending || isUpdatePending || loading}
					className="w-full"
					type="submit"
				>
					{isPending || isUpdatePending || loading ? (
						<Loading />
					) : (
						<span>Submit</span>
					)}
				</Button>
			</DialogFooter>
		</form>
	);
}

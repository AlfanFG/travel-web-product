import InputText from "@/components/input/InputText";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";

import InputTextArea from "@/components/input/InputTextarea";

import { DialogFooter } from "@/components/ui/dialog";

import Loading from "@/components/ui/loading";

import { useFetchCategoryById } from "./hooks/useFetchCategoryById";
import type { CategoryProps } from "./hooks";
import { usePutCategory } from "./hooks/usePutCategory";

import { usePostCategory } from "./hooks/usePostCategory";
import { zodResolver } from "@hookform/resolvers/zod";

export const categorySchema = z.object({
	name: z.string().min(1, { message: "Name is required!" }),
	description: z.string(),
});

interface ICategoryForm {
	id?: string | undefined;
	hideModal: () => void;
}

export default function CategoryForm({ id, hideModal }: ICategoryForm) {
	const { data: article, isPending: IsPendingData } = useFetchCategoryById(id);

	const { mutate, isPending } = usePostCategory({
		afterSuccess: hideModal,
	});
	const { mutate: mutatePut, isPending: isUpdatePending } = usePutCategory({
		afterSuccess: hideModal,
	});

	const { control, formState, handleSubmit } = useForm({
		values: {
			name: article?.data?.name || "",
			description: article?.data?.description || "",
		},
		resolver: zodResolver(categorySchema),
	});

	const { errors } = formState;
	const onSubmit = async (values: CategoryProps) => {
		if (id) {
			mutatePut({ data: { ...values }, documentId: id });
		} else {
			mutate({
				data: {
					...values,
				},
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
				<InputText
					id="name"
					error={errors?.name?.message}
					name="name"
					label="Name"
					placeholder="Add category name"
					control={control}
					hook
				/>

				<InputTextArea
					id="description"
					error={errors?.description?.message}
					name="description"
					label="Description"
					placeholder="Add category description"
					control={control}
					hook
				/>
			</div>
			<DialogFooter className="absolute bottom-2 right-0 w-full px-12 bg-white p-4">
				<Button
					disabled={isPending || isUpdatePending}
					className="w-full"
					type="submit"
				>
					{isPending || isUpdatePending ? <Loading /> : <span>Submit</span>}
				</Button>
			</DialogFooter>
		</form>
	);
}

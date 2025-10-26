import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosError } from "axios";

import API from "@/api/api";
import { toast } from "react-toastify";
import type { PutCategoryProps } from ".";

const putCategory = ({ documentId, data }: PutCategoryProps) => {
	return API.put(`/categories/${documentId}`, { data });
};

export const usePutCategory = ({
	afterSuccess,
}: {
	afterSuccess: () => void;
}) => {
	const queryCLient = useQueryClient();

	return useMutation({
		mutationFn: putCategory,
		onSuccess: () => {
			queryCLient.invalidateQueries({
				queryKey: ["categories"],
			});

			afterSuccess();
			toast.success(`Categories has been updated successfully!`);
		},
		onError: (
			error: AxiosError<{
				error: {
					details?: { errors?: { message: string }[] };
					message: string;
				};
			}>
		) => {
			const errorMessage =
				error.response?.data?.error?.details?.errors?.map(
					(item) => `<li key={${item.message}}>${item.message}</li>`
				) || error.response?.data?.error?.message;

			toast.error(`<ul>${errorMessage}</ul>`);
		},
	});
};

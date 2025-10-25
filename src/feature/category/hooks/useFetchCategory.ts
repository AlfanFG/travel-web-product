import type { AxiosResponse } from "axios";
import type { ICategory } from ".";
import API from "@/api/api";
import { useQuery } from "@tanstack/react-query";

const fetchCategory = async (
	page?: number,
	limit?: number,
	category?: string
) => {
	try {
		const response: AxiosResponse<IPaginateResponse<ICategory>> = await API.get(
			"/categories",
			{
				params: {
					"pagination[page]": page,
					"pagination[pageSize]": limit,
					"filters[name][$containsi]": category || undefined,
				},
			}
		);
		return {
			success: true,
			data: response.data.data,
			meta: response.data.meta,
		};
	} catch (err: any) {
		const message =
			err.response?.data?.error?.message ||
			"Failed to fetch articles. Please try again.";
		return { success: false, error: message };
	}
};

export const useFetchCategory = (
	page?: number,
	limit?: number,
	category?: string
) => {
	return useQuery({
		queryKey: ["categories", page, limit, category],
		queryFn: () => fetchCategory(page, limit, category),
		refetchOnWindowFocus: false,
		retry: 1,
		retryDelay: 1000,
	});
};

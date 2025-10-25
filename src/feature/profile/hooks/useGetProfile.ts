import type { AxiosResponse } from "axios";
import API from "@/api/api";
import { useQuery } from "@tanstack/react-query";

const getProfile = async () => {
	try {
		const response: AxiosResponse<IProfile> = await API.get("/users/me");
		return {
			success: true,
			data: response.data,
		};
	} catch (err: any) {
		const message =
			err.response?.data?.error?.message ||
			"Failed to fetch articles. Please try again.";
		return { success: false, error: message };
	}
};

export const useGetProfile = () => {
	return useQuery({
		queryKey: ["categories"],
		queryFn: () => getProfile(),
		refetchOnWindowFocus: false,
		retry: 1,
		retryDelay: 1000,
	});
};

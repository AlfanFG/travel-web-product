import API from "@/api/api";
import type { ICategory } from "@/feature/category/hooks";
import { getError } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

const fetchCategoryById = async (id: string | undefined) => {
  try {
    const response: AxiosResponse<IPaginateResponseById<ICategory>> =
      await API.get(`/categories/${id}`);
    return { success: true, data: response.data.data };
  } catch (err) {
    const message = getError(err);
    return { success: false, error: message };
  }
};

export const useFetchCategoryById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => fetchCategoryById(id),
    refetchOnWindowFocus: false,
    retry: 1,
    retryDelay: 1000,
    enabled: !!id,
  });
};

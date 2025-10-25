import API from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import type { IArticles } from ".";
import { getError } from "@/lib/utils";

const fetchArticlesById = async (id: string | undefined) => {
  try {
    const response: AxiosResponse<IPaginateResponseById<IArticles>> =
      await API.get(`/articles/${id}`);
    return { success: true, data: response.data.data };
  } catch (err) {
    const message = getError(err);

    return { success: false, error: message };
  }
};

export const useFetchArticleById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticlesById(id),
    refetchOnWindowFocus: false,
    retry: 1,
    retryDelay: 1000,
    enabled: !!id,
  });
};

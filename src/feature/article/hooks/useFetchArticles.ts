import API from "@/api/api";
import type { ICategory } from "@/feature/category/hooks";
import type { IComment } from "@/feature/comments/hooks";
import { getError } from "@/lib/utils";
import type { IUserProfile } from "@/stores/profileStore";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

interface IArticles {
  id: string;
  documentId: string;
  title: string;
  description: string;
  cover_image_url: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  publishedAt: Date | undefined;
  locale: string | undefined;
  user: IUserProfile;
  category: ICategory;
  comments: IComment[];
  localizations: [];
}

interface IArticleFetchProps {
  page: number;
  limit: number;
  title: string;
  category: string;
  documentId: string;
  comment: boolean;
}

const fetchArticles = async ({
  page,
  limit,
  title,
  category,
  comment,
  documentId,
}: Partial<IArticleFetchProps>) => {
  try {
    const response: AxiosResponse<IPaginateResponse<IArticles>> = await API.get(
      "/articles",
      {
        params: {
          "pagination[page]": page,
          "pagination[pageSize]": limit,
          "filters[title][$containsi]": title,
          "filters[documentId][$containsi]": documentId,
          "filters[category][name][$containsi]": category,
          "populate[comments][populate][user]": comment,
        },
      }
    );
    return {
      success: true,
      data: response.data.data,
      meta: response.data.meta,
    };
  } catch (err) {
    const message = getError(err);
    return { success: false, error: message };
  }
};

export const useFetchArticles = ({
  page,
  limit,
  title,
  category,
  documentId,
  comment,
}: Partial<IArticleFetchProps>) => {
  return useQuery({
    queryKey: ["articles", page, limit, title, category],
    queryFn: () =>
      fetchArticles({ page, limit, title, category, comment, documentId }),
    refetchOnWindowFocus: false,
    retry: 1,
    retryDelay: 1000,
  });
};

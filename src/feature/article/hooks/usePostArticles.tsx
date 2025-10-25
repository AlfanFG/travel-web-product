import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { AxiosError } from "axios";
import API from "@/api/api";
import type { PostArticlesProps } from ".";

const postArticles = async ({ data }: PostArticlesProps) => {
  return await API.post("/articles", {
    data: { ...data, category: data.category || undefined },
  });
};

export const usePostArticles = ({
  afterSuccess,
}: {
  afterSuccess: () => void;
}) => {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: postArticles,
    onSuccess: () => {
      queryCLient.invalidateQueries({
        queryKey: ["articles"],
      });
      afterSuccess();
      toast.success(`Articles has been added successfully!`);
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
        error.response?.data?.error?.details?.errors?.map((item) => (
          <li key={item.message}>{item.message}</li>
        )) || error.response?.data?.error?.message;
      toast.error(<ul>{errorMessage}</ul>);
    },
  });
};

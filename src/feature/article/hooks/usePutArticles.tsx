import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosError } from "axios";
import type { PutArticlesProps } from ".";
import API from "@/api/api";
import { toast } from "react-toastify";

const putArticles = ({ documentId, data }: PutArticlesProps) => {
  return API.put(`/articles/${documentId}`, {
    data: { ...data, category: data.category || undefined },
  });
};

export const usePutArticles = ({
  afterSuccess,
}: {
  afterSuccess: () => void;
}) => {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: putArticles,
    onSuccess: () => {
      queryCLient.invalidateQueries({
        queryKey: ["articles"],
      });
      afterSuccess();
      toast.success(`Articles has been updated successfully!`);
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

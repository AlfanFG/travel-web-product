import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosError } from "axios";

import API from "@/api/api";
import { toast } from "react-toastify";

const deleteArticles = ({ documentId }: { documentId: string }) => {
  return API.delete(`/articles/${documentId}`);
};

export const useDeleteArticles = () => {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: deleteArticles,
    onSuccess: () => {
      queryCLient.invalidateQueries({
        queryKey: ["articles"],
      });

      toast.success(`Articles has been deleted successfully!`);
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

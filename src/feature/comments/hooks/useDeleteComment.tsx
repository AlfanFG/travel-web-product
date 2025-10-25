import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosError } from "axios";

import API from "@/api/api";
import { toast } from "react-toastify";

const deleteComment = ({ documentId }: { documentId: string }) => {
  return API.delete(`/comments/${documentId}`);
};

export const useDeleteComment = () => {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryCLient.invalidateQueries({
        queryKey: ["comments"],
      });

      toast.success(`Comment has been deleted!`);
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

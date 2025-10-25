import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { AxiosError } from "axios";
import API from "@/api/api";
import type { putCommentProps } from ".";

const putComment = async ({ data, documentId }: putCommentProps) => {
  return await API.put(`/comments/${documentId}`, { data });
};

export const usePutComment = ({
  afterSuccess,
}: {
  afterSuccess: () => void;
}) => {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: putComment,
    onSuccess: () => {
      queryCLient.invalidateQueries({
        queryKey: ["comments"],
      });
      afterSuccess();
      toast.success(`Comments updated successfully!`);
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

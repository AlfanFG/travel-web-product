import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { AxiosError } from "axios";
import API from "@/api/api";
import type { CommentProps } from "./hooks";

const postComments = async ({ data }: { data: CommentProps }) => {
  return await API.post("/comments", { data });
};

export const usePostComments = () => {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: postComments,
    onSuccess: () => {
      queryCLient.invalidateQueries({
        queryKey: ["comments"],
      });

      toast.success(`Comments posted successfully!`);
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

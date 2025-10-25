import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { AxiosError } from "axios";
import API from "@/api/api";

import type { CategoryProps } from ".";

const postCategory = async ({ data }: { data: CategoryProps }) => {
  return await API.post("/categories", { data });
};

export const usePostCategory = ({
  afterSuccess,
}: {
  afterSuccess: () => void;
}) => {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: postCategory,
    onSuccess: () => {
      queryCLient.invalidateQueries({
        queryKey: ["categories"],
      });
      afterSuccess();
      toast.success(`Category has been added successfully!`);
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

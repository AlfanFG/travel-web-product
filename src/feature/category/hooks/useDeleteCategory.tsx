import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AxiosError } from "axios";

import API from "@/api/api";
import { toast } from "react-toastify";

const deleteCategories = ({ documentId }: { documentId: string }) => {
  return API.delete(`/categories/${documentId}`);
};

export const useDeleteCategories = () => {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategories,
    onSuccess: () => {
      queryCLient.invalidateQueries({
        queryKey: ["categories"],
      });

      toast.success(`Categories has been deleted successfully!`);
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

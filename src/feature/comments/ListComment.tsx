import { useEffect, useState } from "react";

import { useGetPagination } from "@/stores/paginationStore";

import FilterData, { type listFilter } from "@/components/FilterData";
import { useSetLoading } from "@/stores/loadingStore";
import { useFetchComments } from "./hooks/useFetchComments";
import CommentTable from "./CommentTable";
import ButtonRefresh from "@/components/buttons/ButtonRefresh";

export default function ListComments() {
  const [search, setSearch] = useState<string | undefined>();
  const loading = useSetLoading();

  const pagination = useGetPagination();

  const listFilter: listFilter = [
    {
      label: "Search Content",
      name: "content",
      placeholder: "Search Description",
      type: "text",
      setFilter: setSearch,
    },
  ];
  const {
    data: comments,
    isPending,
    refetch,
  } = useFetchComments({
    page: pagination.pageIndex,
    limit: pagination.pageSize,
    content: search,
    populateUser: true,
    populateArticle: true,
  });

  useEffect(() => {
    if (isPending) loading(true);
    if (!isPending) loading(false);
  }, [isPending]);

  return (
    <div className="flex flex-col gap-2 w-full px-6 py-6">
      <div className="flex gap-4 items-end bg-white w-full flex-col xl:flex-row xl:justify-between p-6 rounded-md">
        <div className="flex flex-col justify-between xl:items-end xl:flex-row gap-4 w-full">
          <FilterData listFilter={listFilter} />
          <ButtonRefresh onClick={refetch} />
        </div>
      </div>

      <div className="bg-white w-full rounded-md p-4">
        <CommentTable
          comments={comments?.data ?? []}
          meta={
            comments?.meta ?? {
              pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
            }
          }
        />
      </div>
    </div>
  );
}

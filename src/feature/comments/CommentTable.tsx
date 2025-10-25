import React from "react";

import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TableData from "@/components/table";
import type { IComment } from "./hooks";
import { formatDate } from "@/lib/utils";
import { useGetPagination } from "@/stores/paginationStore";

interface ICommentTable {
  comments: IComment[];
  meta: IMeta;
}

export default function CommentTable({ comments, meta }: ICommentTable) {
  const pagination = useGetPagination();

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const columns = React.useMemo<ColumnDef<IComment, unknown>[]>(
    () => [
      {
        accessorKey: "No",
        cell: (info) => info.getValue(),
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row?.user?.username,
        id: "name",
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.content,
        id: "description",
        header: "Description",
        cell: (info) => (info.getValue() ? info.getValue() : "-"),
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => `${row.createdAt}`,
        id: "created_at",
        header: "Created At",
        cell: (info) => formatDate(info.getValue() as Date | undefined),
        enableColumnFilter: false,
      },
    ],
    []
  );

  const table = useReactTable({
    data: comments || [],
    columns,
    filterFns: {},
    state: {
      columnFilters,
      pagination,
    },
    manualPagination: true,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <div className="p-2">
      <TableData<IComment>
        table={table}
        totalData={meta?.pagination?.total ?? 0}
        totalPage={meta?.pagination?.pageCount ?? 10}
      />
    </div>
  );
}

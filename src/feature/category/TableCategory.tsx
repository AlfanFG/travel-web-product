import React, { useState } from "react";

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
import type { ICategory } from "./hooks";
import { formatDate } from "@/lib/utils";
import { useGetPagination } from "@/stores/paginationStore";

import CategoryForm from "./CategoryForm";
import useModalForm from "@/hooks/useModalForm";
import ButtonEdit from "@/components/buttons/ButtonEdit";
import { useDeleteCategories } from "./hooks/useDeleteCategory";
import { ButtonConfirmation } from "@/components/buttons/confirmation-button";
import ButtonDelete from "@/components/buttons/ButtonDelete";

interface ITableCategory {
  categories: ICategory[];
  meta: IMeta;
}

export default function TableCategory({ categories, meta }: ITableCategory) {
  const pagination = useGetPagination();
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const { createModalForm, showModal, hideModal } =
    useModalForm("Edit Category");
  const { mutate: mutateDelete, isPending: isPendingDelete } =
    useDeleteCategories();

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const columns = React.useMemo<ColumnDef<ICategory, unknown>[]>(
    () => [
      {
        accessorKey: "No",
        cell: (info) => info.getValue(),
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.name,
        id: "name",
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
        enableColumnFilter: false,
      },
      {
        accessorFn: (row) => row.description,
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
      {
        accessorFn: (row) => row.documentId,
        id: "action",
        header: "Action",
        cell: (info) => (
          <div className="flex gap-4">
            <ButtonEdit
              onClick={() => {
                showModal();
                setCategoryId(info.getValue() as string);
              }}
            />
            <ButtonConfirmation
              description="This action cannot be undone. This will  delete your data!"
              button={<ButtonDelete />}
              confirm={() => {
                mutateDelete({ documentId: info.getValue() as string });
                setCategoryId(info.getValue() as string);
              }}
            />
          </div>
        ),
        enableColumnFilter: false,
      },
    ],
    []
  );

  const table = useReactTable({
    data: categories || [],
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
      <TableData<ICategory>
        table={table}
        totalData={meta?.pagination?.total ?? 0}
        totalPage={meta?.pagination?.pageCount ?? 10}
        isPendingRow={isPendingDelete}
        currentId={categoryId}
      />
      {createModalForm(<CategoryForm hideModal={hideModal} id={categoryId} />)}
    </div>
  );
}

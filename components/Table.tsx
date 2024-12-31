"use client";

import React from "react";
import ReactDOM from "react-dom/client";
import {
  ChevronRight,
  ChevronLeft,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";

import {
  Column,
  ColumnDef,
  PaginationState,
  Table as TanstackTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { InferSelectModel } from "drizzle-orm";
import { feedbacks, projects } from "@/db/schema";
import Ratings from "./Ratings";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
type Feedback = InferSelectModel<typeof feedbacks>;


function Table(props: { data: Feedback[] }) {
  const rerender = React.useReducer(() => ({}), {})[1]

  const columns = React.useMemo<ColumnDef<Feedback>[]>(
    () => [
      {
        accessorKey: 'userName',
        header: 'First Name',
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.userEmail,
        id: 'userEmail',
        cell: info => info.getValue(),
        header: () => <span>Email</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.rating,
        id: 'rating',
        cell: info => info.getValue() === null ? <span>N/A</span> : <Ratings rating={info.getValue() as number}  />,
        header: () => <span>Rating</span>,
        footer: props => props.column.id,
        
        
      },
      {
        accessorKey: 'message',
        header: () => 'Message',
        footer: props => props.column.id,
        size: 400,
        minSize: 200,
        maxSize: 600,
      }
    ],
    []
  )



  return (
    <>
      <MyTable
        {...{
          data: props.data,
          columns,
        }}
      />
      <hr />
    </>
  )
}

function MyTable({
  data,
  columns,
}: {
  data: Feedback[]
  columns: ColumnDef<Feedback>[]
}) {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    state: {
      pagination,
    },
    // autoResetPageIndex: false, // turn off page index reset when sorting or filtering
  })
  

  return (
    <div className="p-2 mt-5">
      <div className="h-2" />
      <table className="md:w-full  sm:table-fixed  ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="w-full border-b border-slate-200 flex-col justify-between text-center"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className=" flex-col justify-between text-center  bg-secondary font-extrabold text-lg text-primary p-4"
                    colSpan={header.colSpan}
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                      {header.column.getCanFilter() ? (
                        <div className="mt-2 flex text-center justify-center">
                          <Filter column={header.column} table={table} />
                        </div>
                      ) : null}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="flex-col justify-between text-center p-4 border-b  font-medium font-serif text-lg"
                      style={{
                        width: cell.column.getSize(),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded bg-blue-700 p-1 cursor-pointer"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft />
        </button>
        <button
          className="border rounded p-1 bg-blue-500 cursor-pointer"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
        </button>
        <button
          className="border rounded p-1 bg-blue-500 cursor-pointer"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight />
        </button>
        <button
          className="border rounded p-1 bg-blue-700 cursor-pointer"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight />
        </button>
        <span className="flex items-center gap-1 text-primary">
          | Go to page:
          <Input
            className="w-16 border"
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
          />
        </span>

        <select
          className="w-28 h-8 rounded-md text-center bg-primary/65 "
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option
              className="bg-primary-foreground text-primary"
              key={pageSize}
              value={pageSize}
            >
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function Filter({
  column,
  table,
}: {
  column: Column<any, any>
  table: TanstackTable<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()
  const isMessageColumn = column.id === "message";
  

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
      <Input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        className="bg-primary/25 text-primary/15 shadow border-blue-900 w-24 text-center"
        placeholder="Min"
      />
      <Input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        className="bg-primary/25 text-primary/15 shadow border-blue-900 w-24 text-center"
        placeholder="Max"
      />
    </div>
  ) : (
    // <div className={`${isMessageColumn ? "flex justify-center" : ""} w-full `}>
    <div className="">
      <Input
        className={`w-36 border text-center shadow rounded p-1 ${
          isMessageColumn ? "text-center" : ""
        } bg-primary/25 text-primary font-thin`}
        onChange={(e) => column.setFilterValue(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        placeholder={`Search...`}
        type="text"
        value={(columnFilterValue ?? "") as string}
      />
    </div>
  );
}

export default Table;



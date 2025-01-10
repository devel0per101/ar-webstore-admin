"use client"  // This makes sure the code runs on the user's browser.

import {  // We are importing tools to create and manage the table (like sorting and filtering).
  ColumnDef,
  ColumnFiltersState,
  getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {  // These are components that create the table structure (rows, cells, headers).
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";   // This is the input field where users can type to search in the table.
import { useState } from "react";   // We use `useState` to store and update the table filters (like search terms).

interface DataTableProps<TData, TValue> {  // This defines the types of data we expect for our table.
  columns: ColumnDef<TData, TValue>[]; // List of table columns.
  data: TData[];  // List of rows (data) to display.
  searchKey: string;  // The column key used for searching.
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(    // This keeps track of the search filters applied to the table.
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),  // Set up the basic row model.
    onColumnFiltersChange: setColumnFilters,  // Update filters when they change.
    getFilteredRowModel: getFilteredRowModel(), // Apply the filters to the rows.
    state: {
      columnFilters,
    },
  });

  return (
    <div className="py-5">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search..."
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}   // Set the search input field to match the current filter.
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)  // When the user types, update the filter to show matching results.
          }
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>            {/* Render the column header */}
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>  

                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => ( 
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}   {/* Render each cell in the row */}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.          {/* Show a message if no rows match the search/filter */}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>

  )
}

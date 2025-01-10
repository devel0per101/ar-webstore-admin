"use client" // Marks the file to be run on the client side, not the server.

import { ColumnDef } from "@tanstack/react-table"  // Imports the ColumnDef type from tanstack/react-table to define table columns.
import Delete from "../custom ui/Delete"  // Imports the Delete component, likely for handling the delete action in the table.

export const columns: ColumnDef<CollectionType>[] = [   // Defines the columns for the table with data from the CollectionType.
    {
      accessorKey: "title",  // This tells the table to get the title from the data.
      header: "Title",  // The header of this column will say "Title".
      cell: ({ row }) => <p>{row.original.title}</p> // In each row, show the title of the collection.
    },
    {
      accessorKey: "products", // This tells the table to get the products from the data.
      header: "Products",      // The header of this column will say "Products".
      cell: ({ row }) => <p>{row.original.products.length}</p>, // Show how many products are in each collection.
    },
    {
        id: "action",         // This is a special column for actions (like delete).
        cell: ({ row }) => <Delete id ={row.original._id} />  // In each row, show a Delete button and pass the collection's ID.
    },
  ]

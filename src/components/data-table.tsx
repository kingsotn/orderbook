"use client"

import * as React from "react"
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./shadui"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([{ id: 'price', desc: true }]); // pre sort in descending (green on top)


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    })

    const handleRowClick = (row: any) => {
        console.log(row.original); // Log the entire row's data
    }

    const getCellClass = (value: any, columnId: any) => {
        const marketPrice = "2.85" // prob should be some api call
        if (columnId !== "price") return ""
        if (value == marketPrice) return ""
        return value > marketPrice ? 'text-emerald-600' : "text-red-600"
    };

    const marketPrice = 2.85;


    return (
        <div className="rounded-md border bg-white">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
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
                        table.getRowModel().rows.map((row) => {
                            return (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="transform transition-transform hover:scale-105 hover:bg-gray-100 cursor-pointer hover:shadow-md"
                                    onClick={() => handleRowClick(row)}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        const value = cell.getValue();
                                        const cellClass = getCellClass(value, cell.column.id);
                                        const isMarketPriceRow = value === "Invalid Date" || (typeof value === 'number' && isNaN(value)) || value === "0";

                                        return (
                                            <TableCell key={cell.id} className={`text-center ${cellClass}`}>
                                                {!isMarketPriceRow && <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div >
    )
}

"use client"

import React, { useState, ReactNode } from 'react';
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
import { Tooltip } from "@nextui-org/tooltip";

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
                                <Tooltip color='default' placement='right' size='lg' showArrow content='hi' className='text-black rounded-md'>

                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className={`transform transition-transform cursor-pointer hover:shadow-sm ${row.getVisibleCells().some(cell => {
                                            const value = cell.getValue();
                                            return value === "Invalid Date" || (typeof value === 'number' && isNaN(value)) || value === "0";
                                        }) ? 'bg-gray-100 hover:scale-100 hover:shadow-none' : 'hover:bg-gray-100'
                                            }`}
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
                                </Tooltip>
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

interface OrderBookTooltipProps {
    children: ReactNode;
    content: string;
}

const OrderBookTooltip: React.FC<OrderBookTooltipProps> = ({ children, content }) => {
    const [visible, setVisible] = useState(false);

    const showTooltip = () => setVisible(true);
    const hideTooltip = () => setVisible(false);

    return (
        <div
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            className="relative inline-block"
        >
            {children}
            {visible && (
                <div className="absolute left-full ml-2 p-2 bg-black text-white text-sm rounded shadow-lg">
                    {content}
                </div>
            )}
        </div>
    );
};

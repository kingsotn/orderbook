"use client"

import React, { useState } from 'react';
import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
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
        console.log(row.original.key); // Log the entire row's data
        console.log(row.original.key); // Log the entire row's data
    }

    const getCellClass = (value: any, columnId: any) => {
        const marketPrice = "2.85" // prob should be some api call
        if (columnId !== "price") return ""
        if (value == marketPrice) return ""
        return value > marketPrice ? 'text-red-600' : "text-emerald-600"
    };

    const marketPrice = 2.85;

    const renderTooltipContent = (row: any) => {
        const original = row.original;

        // Filter out the "range" key and format "price" and "total" values
        const filteredEntries = Object.entries(original)
            .filter(([key, value]) => key !== 'range')
            .map(([key, value]) => {
                if (key === "price" || key === "total") {
                    value = `$` + value;
                }
                return [key, value];
            });

        return (
            <div>
                {filteredEntries.map(([key, value]) => {
                    if (key === "start" || key === "end") {
                        // Ensure value is treated as a string
                        const date = new Date(value as string);

                        // Format the date as MM/DD @H PM/AM
                        const formattedDate = `${date.getMonth() + 1}/${date.getDate()} @${date.getHours() % 12 || 12}${date.getHours() >= 12 ? 'PM' : 'AM'}`;

                        return (
                            <div key={key} className="flex justify-between">
                                <span className="mr-4 text-gray-600 mb-1">{key}:</span>
                                <span className="ml-4">{formattedDate}</span>
                            </div>
                        );
                    } else {
                        return (
                            <div key={key as string} className="flex justify-between">
                                <span className="mr-4 text-gray-600 mb-1">{key as string}:</span>
                                <span className="ml-4">{value as React.ReactNode}</span>
                            </div>
                        );
                    }
                })}
            </div>
        );
    };

    const [isLoaded, setIsLoaded] = useState(false);

    // const [isLoaded, setIsLoaded] = useState<boolean>(false)
    // useEffect(() => {
    //     setIsLoaded(true);
    // }, [])
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
                                ((row.original as any).refNumber !== "marketPriceRow") ? ( // don't render the marketPrice row
                                    <Tooltip
                                        key={`tooltip-${row.id}`} // Add key prop here
                                        color='default'
                                        placement='right'
                                        size='lg'
                                        disableAnimation
                                        showArrow
                                        content={renderTooltipContent(row)}
                                        closeDelay={0}
                                        className='text-black rounded-md bg-opacity-85 p-6 text-sm'
                                    >
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
                                ) : ( // this is the marketPriceRow, there's some subtle diff in the styling
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className={`transform transition-transform cursor-pointer hover:shadow-sm ${row.getVisibleCells().some(cell => {
                                            const value = cell.getValue();
                                            return value === "Invalid Date" || (typeof value === 'number' && isNaN(value)) || value === "0";
                                        }) ? 'bg-gray-100 text-gray-600 hover:scale-100 hover:shadow-none hover:cursor-default' : 'hover:bg-gray-100'
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
                                )
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

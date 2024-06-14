"use client";
import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from './data-table';
import { processedMockData } from './mock_data';
import { Button, Skeleton } from '@nextui-org/react';
import { useEffect, useState } from "react";

const UpDownSVG = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M7 15l5 5 5-5" />
        <path d="M7 9l5-5 5 5" />
    </svg>
);


interface ReceiptData {
    refNumber: string;
    orderType: string;
    price: string;
    gpuCount: string;
    time: string;
    total: string;
    startDate: string;
    endTime: string;
}

// column definitions for the orderbook
export const columns: ColumnDef<ReceiptData>[] = [
    {
        accessorKey: "price",
        header: ({ column }) => {
            const isSorted = column.getIsSorted();
            return (
                <Button
                    variant='flat'
                    size="sm"
                    fullWidth
                    endContent={<UpDownSVG />}
                    disableAnimation
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className={`pt-2 border-none bg-white ${isSorted ? 'font-semibold' : ''}`}
                >
                    $ / gpuhr
                </Button>
            )
        },
        cell: ({ row, column }) => {
            const price = parseFloat(row.getValue("price"));
            return <div className="flex justify-left pl-6">{price.toFixed(2)}</div>;
        },
    },
    {
        accessorKey: "gpuCount",
        header: ({ column }) => {
            const isSorted = column.getIsSorted();
            return (
                <Button
                    variant='flat'
                    size="sm"
                    fullWidth
                    endContent={< UpDownSVG />}
                    disableAnimation
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className={`pt-2 border-none bg-white ${isSorted ? 'font-semibold' : ''}`}

                >
                    GPUs
                </Button>
            )
        },
        cell: ({ row, column }) => {
            const gpuCount = parseFloat(row.getValue("gpuCount"))
            return <div className="flex justify-left pl-4">{gpuCount}</div>;
        },
    },
    {
        accessorKey: "range",
        header: ({ column }) => {
            const isSorted = column.getIsSorted();
            return (
                <Button
                    variant='flat'
                    size="sm"
                    fullWidth
                    endContent={< UpDownSVG />}
                    disableAnimation
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className={`pt-2 border-none bg-white ${isSorted ? 'font-semibold' : ''}`}
                >
                    Range
                </Button >
            )
        },
        cell: ({ row, column }) => {
            const range: string = row.getValue("range")
            return <div className="flex justify-left">{range}</div>;
        },
    },
    {
        accessorKey: "hours",
        header: ({ column }) => {
            const isSorted = column.getIsSorted();
            return (
                <Button
                    variant='flat'
                    size="sm"
                    fullWidth
                    endContent={< UpDownSVG />}
                    disableAnimation
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className={`pt-2 border-none bg-white ${isSorted ? 'font-semibold' : ''}`}

                >
                    Hours
                </Button >
            )
        },
        cell: ({ row, column }) => {
            const hours = parseFloat(row.getValue("hours"))
            return hours > 0 ? <div className="flex justify-end mr-6">{hours}</div> : <div className="flex justify-end mr-6"></div>; // don't render anything if hours ==0
        },
    },
    {
        accessorKey: "total",
        header: ({ column }) => {
            const isSorted = column.getIsSorted();

            return (
                <Button
                    variant='flat'
                    size="sm"
                    fullWidth
                    endContent={<UpDownSVG />}
                    disableAnimation
                    onClick={() => column.toggleSorting(isSorted === "asc")}
                    className={`pt-2 border-none bg-white ${isSorted ? 'font-semibold' : ''}`}
                >
                    Total ($)
                </Button>
            )
        },
        cell: ({ row, column }) => {
            const total = parseFloat(row.getValue("total")).toFixed(2);
            return <div className="flex justify-end mr-6">{total}</div>;
        },
    }
];

const OrderBook: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        setIsLoaded(true)
    }, []); // Empty dependency array ensures this runs once on component mount

    return (
        <Skeleton isLoaded={isLoaded} className="before:-translate-x-1/8 before:opacity-35 rounded-md">
            <div className="min-w-[500px] max-w-[500px]">
                <DataTable columns={columns} data={processedMockData} />
            </div>
        </Skeleton>
    );
};

export default OrderBook;
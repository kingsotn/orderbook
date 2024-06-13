"use client";
import { useEffect, useState } from 'react';
import * as React from "react"
import { Tabs, Tab } from "@nextui-org/react";
// import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./shadui"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from './data-table';
import { processedMockData } from './mock_data';
import { Button } from '@nextui-org/react';

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
                    className={`border-none bg-white ${isSorted ? 'font-semibold' : ''}`}
                >
                    $ / gpuhr
                </Button>
            )
        },
        cell: ({ row, column }) => {
            const price = parseFloat(row.getValue("price"));
            return <div className="flex justify-left pl-6 font-semibold ">{price.toFixed(2)}</div>;
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
                    className={`border-none bg-white ${isSorted ? 'font-semibold' : ''}`}

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
                    className={`border-none bg-white ${isSorted ? 'font-semibold' : ''}`}
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
                    className={`border-none bg-white ${isSorted ? 'font-semibold' : ''}`}

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
                    className={`border-none bg-white ${isSorted ? 'font-semibold' : ''}`}
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
    return (
        <div className="max-w-[500px]">
            <DataTable columns={columns} data={processedMockData} />
        </div>
    );
};

export default OrderBook;
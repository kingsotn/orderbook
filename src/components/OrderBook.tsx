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
            return <div className="">{price}</div>;
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
            return <div className="">{gpuCount}</div>;
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
            const isSorted = column.getIsSorted();
            return <div className="">{range}</div>;
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
            return <div className="">{hours}</div>;
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
            return <div className="">{total}</div>;
        },
    }
];




const parseReceiptData = (rawData: string): ReceiptData => {
    const lines = rawData.split('\n');
    const data: any = {};
    lines.forEach(line => {
        const [key, ...rest] = line.split(': ');
        data[key] = rest.join(': ');
    });
    return data as ReceiptData;
};

const OrderBook: React.FC = () => {
    const [receiptData, setReceiptData] = useState<ReceiptData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReceiptData = async () => {
            try {
                const response = await fetch('/api/order');
                const data = await response.json();
                const parsedData = data.data.map((rawData: string) => parseReceiptData(rawData));
                // parsedData.map((e: any) => console.log(e.value, typeof (e)))
                setReceiptData(parsedData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching receipt data:', error);
                setLoading(false);
            }
        };

        fetchReceiptData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    function formatDateRange(start: string, end: string): string {
        const formatDate = (date: string): string => {
            const options: Intl.DateTimeFormatOptions = { month: '2-digit', day: '2-digit' };
            return new Date(date).toLocaleString('en-US', options);
        };

        const startDate = new Date(start);
        const endDate = new Date(end);

        if (startDate.toLocaleDateString() === endDate.toLocaleDateString()) {
            return `${formatDate(start)}`;
        }

        return `${formatDate(start)} → ${formatDate(end)}`;
    }

    function hoursBetween(start: string, end: string): number {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffInMilliseconds = endDate.getTime() - startDate.getTime();
        return diffInMilliseconds / (1000 * 60 * 60);
    }


    return (
        <div className="max-w-[500px]">
            <DataTable columns={columns} data={processedMockData} />
        </div>
    );
};

export default OrderBook;
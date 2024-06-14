"use client";
import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from './data-table';
import { processedMockData } from './mock_data';
import { Button, Skeleton } from '@nextui-org/react';
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"

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

const parseReceiptData = (rawData: string): ReceiptData => {
    const lines = rawData.split('\n');
    const data: any = {};
    lines.forEach(line => {
        const [key, ...rest] = line.split(': ');
        data[key] = rest.join(': ');
    });
    return data as ReceiptData;
};


// useEffect(() => {
//     const fetchReceiptData = async () => {
//         try {
//             const response = await fetch('/api/order');
//             const data = await response.json();
//             const parsedData = data.data.map((rawData: string) => parseReceiptData(rawData));
//             // parsedData.map((e: any) => console.log(e.value, typeof (e)))
//             setReceiptData(parsedData);
//         } catch (error) {
//             console.error('Error fetching receipt data:', error);
//         }
//     };

//     fetchReceiptData();
// }, [processedMockData]); //receive anytime this changes

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
            const [isLoaded, setIsLoaded] = useState<boolean>(false);

            useEffect(() => {
                setIsLoaded(true);
            }, []);

            return (
                <Skeleton
                    isLoaded={isLoaded}
                    className="before:-translate-x-1/8 before:opacity-35 rounded-md before:transition-none"
                    disableAnimation
                >
                    <div className="flex justify-left pl-6">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            {price.toFixed(2)}
                        </motion.span>
                    </div>
                </Skeleton>
            );
        }
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
            const gpuCount = parseFloat(row.getValue("gpuCount"));
            const [isLoaded, setIsLoaded] = useState<boolean>(false);

            useEffect(() => {
                setIsLoaded(true);
            }, []);

            return (
                <Skeleton
                    isLoaded={isLoaded}
                    className="before:-translate-x-1/8 before:opacity-35 rounded-md before:transition-none"
                    disableAnimation
                >
                    <div className="flex justify-left pl-4">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            {gpuCount}
                        </motion.span>
                    </div>
                </Skeleton>
            );
        }
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
            const range = row.getValue("range");
            const [isLoaded, setIsLoaded] = useState<boolean>(false);

            useEffect(() => {
                setIsLoaded(true);
            }, []);

            return (
                <Skeleton
                    isLoaded={isLoaded}
                    className="before:-translate-x-1/8 before:opacity-35 rounded-md before:transition-none"
                    disableAnimation
                >
                    <div className="flex justify-left">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            {range as string}
                        </motion.span>
                    </div>
                </Skeleton>
            );
        }
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
            const [isLoaded, setIsLoaded] = useState<boolean>(false)
            useEffect(() => {
                setIsLoaded(true)
            }, [])
            return (
                <Skeleton
                    isLoaded={isLoaded}
                    className="before:-translate-x-1/8 before:opacity-35 rounded-md before:transition-none"
                    disableAnimation
                >
                    <div className="flex justify-end mr-6">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            {hours > 0 ? (
                                <div className="flex justify-end mr-6">{hours}</div>
                            ) : (
                                <div className="flex justify-end mr-6"></div>
                            )}
                        </motion.span>
                    </div >
                </Skeleton >
            )
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
            const [isLoaded, setIsLoaded] = useState<boolean>(false);

            useEffect(() => {
                setIsLoaded(true);
            }, []);

            return (
                <Skeleton
                    isLoaded={isLoaded}
                    className="before:-translate-x-1/8 before:opacity-35 rounded-md before:transition-none"
                    disableAnimation
                >
                    <div className="flex justify-end mr-6">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            {total}
                        </motion.span>
                    </div>
                </Skeleton>
            );
        }
    }
];

const OrderBook: React.FC = () => {
    return (
        <div className="min-w-[500px] max-w-[500px]">
            <DataTable columns={columns} data={processedMockData} />
        </div>
    );
};

export default OrderBook;
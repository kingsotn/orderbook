"use client";
import { ColumnDef } from "@tanstack/react-table"
import { processedMockData } from './mock_data';
import { Button, Skeleton } from '@nextui-org/react';
import { AnimatePresence, motion } from "framer-motion"
import { columns } from "./columns"
import React, { useEffect, useState } from 'react';
import { DataTable } from "./data-table";
import { ReceiptData } from "./columns";

// const parseReceiptData = (rawData: string): ReceiptData => {
//     const lines = rawData.split('\n');
//     const data: any = {};
//     lines.forEach(line => {
//         const [key, ...rest] = line.split(': ');
//         data[key] = rest.join(': ');
//     });
//     return data as ReceiptData;
// };

const OrderBook: React.FC = () => {
    const [data, setData] = useState<ReceiptData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching data...");
                const response = await fetch('/api/order', {
                    method: 'GET',
                    headers: {
                        'Cache-Control': 'no-store',
                    },
                });
                const result = await response.json();
                console.log("Fetched result:", result);
                setData(result.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData(); // Initial fetch
        const intervalId = setInterval(fetchData, 1000); // Fetch data every second

        return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, []);

    return (
        <div className="min-w-[500px] max-w-[500px]">
            <DataTable columns={columns} data={data} />
        </div>
    );
};


export default OrderBook;
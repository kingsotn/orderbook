"use client";
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
    const [prevDataLength, setPrevDataLength] = useState<number>(0);

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

                if (result.data.length !== prevDataLength) {
                    setData(result.data);
                    setPrevDataLength(result.data.length);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData(); // Initial fetch
        const intervalId = setInterval(fetchData, 1000); // Fetch data every second

        return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, [prevDataLength]);

    return (
        <div className="min-w-[500px] max-w-[500px]">
            <DataTable columns={columns} data={data} />
            {loading && <div>Loading...</div>}
        </div>
    );
};


export default OrderBook;
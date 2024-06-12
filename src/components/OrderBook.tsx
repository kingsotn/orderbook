"use client";
import { useEffect, useState } from 'react';
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


interface ReceiptData {
    refNumber: string;
    orderType: string;
    price: string;
    gpuCount: string;
    time: string;
    total: string;
    startDate: string;
    endTime: string;
    // Add other fields as needed
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

const OrderBook: React.FC = () => {
    const [receiptData, setReceiptData] = useState<ReceiptData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReceiptData = async () => {
            try {
                const response = await fetch('/api/order');
                const data = await response.json();
                const parsedData = data.data.map((rawData: string) => parseReceiptData(rawData));
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

    const mockData = [
        {
            price: "$3.33",
            gpus: "20",
            range: "6/1 —> 6/5",
            total: "$3,124",
        },
        {
            price: "$4.12",
            gpus: "150",
            range: "7/10 —> 7/30",
            total: "$12,300",
        },
        {
            price: "$3.78",
            gpus: "320",
            range: "5/15 —> 5/25",
            total: "$8,450",
        },
        {
            price: "$2.95",
            gpus: "80",
            range: "4/1 —> 4/20",
            total: "$5,250",
        },
        {
            price: "$3.22",
            gpus: "220",
            range: "6/10 —> 6/20",
            total: "$7,125",
        },
        {
            price: "$4.00",
            gpus: "512",
            range: "7/5 —> 7/25",
            total: "$20,480",
        },
        {
            price: "$3.50",
            gpus: "45",
            range: "8/1 —> 8/10",
            total: "$1,575",
        },
        {
            price: "$2.88",
            gpus: "30",
            range: "5/25 —> 6/4",
            total: "$864",
        },
    ]

    return (
        <div
            className="font-mono bg-white p-3 relative flex flex-col space-y-2 w-full min-w-[500px] max-w-[500px] mx-auto rounded-lg border-3 border-gray-400"
        >
            <Tabs aria-label="Options">
                <Tab key="orderbook" title="Order Book">
                    <Table className="table-newyork">
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">$/gpuhr</TableHead>
                                <TableHead>gpus</TableHead>
                                <TableHead>range</TableHead>
                                <TableHead className="text-right">total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockData.map((data) => (
                                <TableRow key={data.price}>
                                    <TableCell className="font-medium">{data.price}</TableCell>
                                    <TableCell>{data.gpus}</TableCell>  g
                                    <TableCell>{data.range}</TableCell>
                                    <TableCell className="text-right">{data.total}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Tab>
                <Tab key="tradehistory" title="Trade History">
                </Tab>
            </Tabs>
            {receiptData.length === 0 ? (
                <p>No receipt data available.</p>
            ) : (
                <ul>
                    {receiptData.map((receipt, index) => (
                        <li key={index}>
                            <pre>{JSON.stringify(receipt, null, 2)}</pre>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderBook;
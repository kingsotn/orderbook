"use client"; // This is a client component 👈🏽
import React, { useEffect, useState } from 'react';
import { BidAsk } from '../app';

const RecentTransactions: React.FC = () => {
    const [transactions, setTransactions] = useState<BidAsk[]>([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await fetch('/api/recentTransactions');
            const data = await response.json();
            setTransactions(data);
        };

        fetchTransactions();
    }, []);

    return (
        <div>
            <h2>Recent Transactions</h2>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Price</th>
                        <th>GPUs</th>
                        <th>Duration</th>
                        <th>Start</th>
                        <th>End</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.type}</td>
                            <td>${transaction.price}</td>
                            <td>{transaction.gpuCount}</td>
                            <td>{transaction.durationDesired}</td>
                            <td>{new Date(transaction.start).toLocaleString()}</td>
                            <td>{new Date(transaction.end).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecentTransactions;

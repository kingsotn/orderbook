"use client";
import React, { useEffect, useState } from 'react';
import { OrderBook } from '../app/types';

const OrderBookComponent: React.FC = () => {
    const [orderBook, setOrderBook] = useState<OrderBook>({ bids: [], asks: [] });

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onmessage = (event) => {
            const updatedOrderBook = JSON.parse(event.data);
            setOrderBook(updatedOrderBook);
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div>
            <h2>Order Book</h2>
            <div>
                <h3>Bids</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Price</th>
                            <th>GPUs</th>
                            <th>Duration</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderBook.bids.map(bid => (
                            <tr key={bid.id}>
                                <td>${bid.price}</td>
                                <td>{bid.gpuCount}</td>
                                <td>{bid.durationDesired}</td>
                                <td>{new Date(bid.start).toLocaleString()}</td>
                                <td>{new Date(bid.end).toLocaleString()}</td>
                                <td>${(bid.price * bid.gpuCount).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h3>Asks</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Price</th>
                            <th>GPUs</th>
                            <th>Duration</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderBook.asks.map(ask => (
                            <tr key={ask.id}>
                                <td>${ask.price}</td>
                                <td>{ask.gpuCount}</td>
                                <td>{ask.durationDesired}</td>
                                <td>{new Date(ask.start).toLocaleString()}</td>
                                <td>{new Date(ask.end).toLocaleString()}</td>
                                <td>${(ask.price * ask.gpuCount).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderBookComponent;

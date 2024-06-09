"use client"; // This is a client component 👈🏽
import React, { useState } from 'react';

const PlaceOrderForm: React.FC = () => {
    const [orderType, setOrderType] = useState<'bid' | 'ask'>('bid');
    const [price, setPrice] = useState<number>(0);
    const [gpuCount, setGpuCount] = useState<number>(1);
    const [durationDesired, setDurationDesired] = useState<string>('1 hour');
    const [start, setStart] = useState<Date>(new Date());
    const [end, setEnd] = useState<Date>(new Date());

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const order = {
            type: orderType,
            price,
            gpuCount,
            durationDesired,
            start,
            end,
            userId: 'user1',
        };
        await fetch('/api/bidsAsks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order),
        });
        // Reset form
        setPrice(0);
        setGpuCount(1);
        setDurationDesired('1 hour');
        setStart(new Date());
        setEnd(new Date());
    };

    return (
        <div>
            <div>
                <button onClick={() => setOrderType('bid')} className={orderType === 'bid' ? 'active' : ''}>
                    Buy Compute
                </button>
                <button onClick={() => setOrderType('ask')} className={orderType === 'ask' ? 'active' : ''}>
                    Sell Compute
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Price:
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                            step="0.01"
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Number of GPUs:
                        <input
                            type="number"
                            value={gpuCount}
                            onChange={(e) => setGpuCount(parseInt(e.target.value))}
                            min="1"
                            max="8"
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Duration Desired:
                        <input
                            type="text"
                            value={durationDesired}
                            onChange={(e) => setDurationDesired(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Start Time:
                        <input
                            type="datetime-local"
                            value={start.toISOString().slice(0, 16)}
                            onChange={(e) => setStart(new Date(e.target.value))}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        End Time:
                        <input
                            type="datetime-local"
                            value={end.toISOString().slice(0, 16)}
                            onChange={(e) => setEnd(new Date(e.target.value))}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Place {orderType === 'bid' ? 'Buy' : 'Sell'} Order</button>
            </form>
        </div>
    );
};

export default PlaceOrderForm;

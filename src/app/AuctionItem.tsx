// src/components/AuctionItem.tsx
import React from 'react';
import { AuctionItem } from './';

interface AuctionItemProps {
    item: AuctionItem;
}

const AuctionItemComponent: React.FC<AuctionItemProps> = ({ item }) => {
    return (
        <div>
            <h3>{item.gpuCount} GPUs</h3>
            <p>From: {new Date(item.startTime).toLocaleString()}</p>
            <p>To: {new Date(item.endTime).toLocaleString()}</p>
            <p>Minimum Bid: ${item.minBid}</p>
        </div>
    );
};

export default AuctionItemComponent;
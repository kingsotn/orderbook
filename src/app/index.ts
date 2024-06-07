export interface AuctionItem {
    id: string;
    gpuCount: number;
    startTime: Date;
    endTime: Date;
    minBid: number;
    listedBy: string;
    reservedBy?: string;
}

export interface BidAsk {
    id: string;
    auctionItemId: string;
    userId: string;
    amount: number;
    type: 'bid' | 'ask';
    timestamp: Date;
}

export interface OrderBook {
    auctionItemId: string;
    bids: BidAsk[];
    asks: BidAsk[];
}
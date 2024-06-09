export interface BidAsk {
    // bid ask
    id: string;
    userId: string;
    type: 'bid' | 'ask';
    timestamp: Date;

    // user selects
    price: number;
    gpuCount: number; // 1-8
    durationDesired: string; // 1 hour --> 31 days
    start: Date;
    end: Date;
}

export interface OrderBook {
    bids: BidAsk[];
    asks: BidAsk[];
}
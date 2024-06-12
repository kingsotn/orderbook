export interface BidAsk {
    // bid ask
    id: string;
    userId: string;
    bidAsk: 'bid' | 'ask';
    limitMarketType: 'limit' | 'market';
    timestamp: Date;

    // user selects
    price: number;
    gpuCount: number; // 1-8
    durationDesired: number; // 1 hour --> 744 hrs (31 days)
    start: Date;
    end: Date;
}
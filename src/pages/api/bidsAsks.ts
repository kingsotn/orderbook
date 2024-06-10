// src/pages/api/bidsAsks.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { BidAsk, OrderBook } from '../../app/types';
import { updateOrderBook } from '../../server/websocket';

let bidsAsks: BidAsk[] = [];
let orderBook: OrderBook = { bids: [], asks: [] };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body } = req;

    if (method === 'POST') {
        const newBidAsk: BidAsk = {
            id: uuidv4(),
            ...body,
            timestamp: new Date(),
        };
        bidsAsks.push(newBidAsk);

        if (newBidAsk.bidAsk === 'bid') {
            orderBook.bids.push(newBidAsk);
        } else {
            orderBook.asks.push(newBidAsk);
        }
        updateOrderBook(orderBook);

        return res.status(201).json(newBidAsk);
    }

    if (method === 'GET') {
        return res.status(200).json(bidsAsks);
    }

    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
}

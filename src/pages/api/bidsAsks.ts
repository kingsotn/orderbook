// src/app/api/bidsAsks.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { BidAsk } from '../..';

let bidsAsks: BidAsk[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, query, body } = req;

    if (method === 'POST') {
        const newBidAsk: BidAsk = {
            id: uuidv4(),
            ...body,
            timestamp: new Date(),
        };
        bidsAsks.push(newBidAsk);
        return res.status(201).json(newBidAsk);
    }

    if (method === 'GET') {
        const { auctionItemId } = query;
        const filteredBidAsks = bidsAsks.filter(ba => ba.auctionItemId === auctionItemId);
        return res.status(200).json(filteredBidAsks);
    }

    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
}

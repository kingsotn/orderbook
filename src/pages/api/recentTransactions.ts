import { NextApiRequest, NextApiResponse } from 'next';
import { BidAsk } from '../../app';

let bidsAsks: BidAsk[] = []; // This should be the same array used in your bidsAsks.ts file

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Return the 10 most recent transactions
        const recentTransactions = bidsAsks.slice(-10).reverse();
        return res.status(200).json(recentTransactions);
    }

    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}

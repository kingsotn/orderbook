// src/pages/api/auctions.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { AuctionItem } from '../..';

let auctionItems: AuctionItem[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  if (method === 'POST') {
    const newAuctionItem: AuctionItem = {
      id: uuidv4(),
      ...body,
    };
    auctionItems.push(newAuctionItem);
    return res.status(201).json(newAuctionItem);
  }

  if (method === 'GET') {
    return res.status(200).json(auctionItems);
  }

  res.setHeader('Allow', ['POST', 'GET']);
  res.status(405).end(`Method ${method} Not Allowed`);
}

import { NextApiRequest, NextApiResponse } from 'next';

let receiptDataStore: any[] = []; // Store the receipt data in memory for this example

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Extract the receipt data from the request body
        const { receiptData } = req.body;

        // Process the receiptData as needed and store it
        receiptDataStore.push(receiptData);

        // Send a success response back
        res.status(200).json({ message: 'Receipt data received successfully', data: receiptData });
    } else if (req.method === 'GET') {
        // Handle GET requests by returning the stored receipt data
        res.status(200).json({ data: receiptDataStore });
    } else {
        // Handle any other HTTP methods
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
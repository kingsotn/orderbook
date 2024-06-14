import { NextApiRequest, NextApiResponse } from 'next';
import { mockData } from '@/components/mock_data';


function formatDateRange(start: string, end: string): string {
    const formatDate = (date: string): string => {
        const options: Intl.DateTimeFormatOptions = { month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleString('en-US', options);
    };

    if (start == "0" || end == "0") return " " // marketPrice row case

    const startDate = new Date(start);
    const endDate = new Date(end);


    if (startDate.toLocaleDateString() === endDate.toLocaleDateString()) {
        return `${formatDate(start)}`;
    }

    return `${formatDate(start)} → ${formatDate(end)}`;
}

function hoursBetween(start: string, end: string): number {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffInMilliseconds = endDate.getTime() - startDate.getTime();
    return diffInMilliseconds / (1000 * 60 * 60);
}

function processMockData(mockData: any) {
    return mockData.map((data: any) => {
        return {
            refNumber: data.refNumber,
            orderType: data.orderType,
            price: data.price,
            gpuCount: data.gpuCount,
            start: data.time,
            end: new Date(data.endTime).toLocaleString(),
            range: formatDateRange(data.time, data.endTime),
            hours: hoursBetween(data.startDate, data.endTime),
            total: data.total,
        };
    });
}



// !! example of processedMockData
// end:  "6/5/2024, 8:00:00 AM"
// gpuCount:  "20"
// hours:  96
// orderType:  "Buy"
// price:  "3.33"
// range:  "06/01 → 06/05"
// refNumber:  "a1b2c3"
// start:  "6/1/2024, 8:00:00 AM"
// total:  "666"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    try {
        if (req.method === 'POST') {
            console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIiii")
            // Extract the receipt data from the request body
            const { receiptData } = req.body;

            if (!receiptData) {
                throw new Error('No receiptData provided');
            }

            // Check if receiptData.orderType exists and doesn't contain "Market"
            // if (receiptData.orderType && !receiptData.orderType.includes("Market")) {
            console.log("old mockData", mockData.length)
            mockData.push(receiptData);
            console.log("new mockData", mockData.length)
            // }

            // Send a success response back
            res.status(200).json({ message: 'Receipt data received successfully HIIIIIIIIIIIIIIIIIIIIIIII', data: receiptData });
        } else if (req.method === 'GET') {
            // Handle GET requests by returning the stored receipt data
            console.log("i received a get for processedMockData", mockData.length)
            const processedMockData = processMockData(mockData)
            res.status(200).json({ data: processedMockData });
        } else {
            // Handle any other HTTP methods
            res.setHeader('Allow', ['POST', 'GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error in API handler:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

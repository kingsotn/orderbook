
// example data3
// "refNumber: 53347e23-6f48-4fed-8cae-5e18b3662771
// orderType: Buy
// price: 2.85
// gpuCount: 2
// startDate: Wed Jun 12 2024 17:00:00 GMT-0700 (Pacific Daylight Time)
// time: 6/12/2024, 5:00:00 PM
// total: 91.2
// endTime: Jun 13, 2024 @9:00 AM"
const mockData = [
    {
        refNumber: "a1b2c3",
        orderType: "Buy",
        price: "2.33",
        gpuCount: "20",
        startDate: "Mon Jun 01 2024 08:00:00 GMT-0700 (Pacific Daylight Time)",
        time: "6/1/2024, 8:00:00 AM",
        total: "46.6",
        endTime: "Jun 5, 2024 @8:00 AM"
    },
    {
        refNumber: "d4e5f6",
        orderType: "Buy",
        price: "2.50",
        gpuCount: "150",
        startDate: "Tue Jul 10 2024 10:00:00 GMT-0700 (Pacific Daylight Time)",
        time: "7/10/2024, 10:00:00 AM",
        total: "375",
        endTime: "Jul 30, 2024 @10:00 AM"
    },
    {
        refNumber: "g7h8i9",
        orderType: "Buy",
        price: "2.60",
        gpuCount: "320",
        startDate: "Thu May 15 2024 14:00:00 GMT-0700 (Pacific Daylight Time)",
        time: "5/15/2024, 2:00:00 PM",
        total: "832",
        endTime: "May 25, 2024 @2:00 PM"
    },
    {
        refNumber: "j1k2l3",
        orderType: "Sell",
        price: "3.00",
        gpuCount: "80",
        startDate: "Mon Apr 01 2024 09:00:00 GMT-0700 (Pacific Daylight Time)",
        time: "4/1/2024, 9:00:00 AM",
        total: "240",
        endTime: "Apr 20, 2024 @9:00 AM"
    },
    {
        refNumber: "m4n5o6",
        orderType: "Sell",
        price: "3.22",
        gpuCount: "220",
        startDate: "Tue Jun 10 2024 11:00:00 GMT-0700 (Pacific Daylight Time)",
        time: "6/10/2024, 11:00:00 AM",
        total: "708.4",
        endTime: "Jun 20, 2024 @11:00 AM"
    },
    {
        refNumber: "p7q8r9",
        orderType: "Sell",
        price: "4.01",
        gpuCount: "512",
        startDate: "Fri Jul 05 2024 16:00:00 GMT-0700 (Pacific Daylight Time)",
        time: "7/5/2024, 4:00:00 PM",
        total: "2048",
        endTime: "Jul 25, 2024 @4:00 PM"
    },
    {
        refNumber: "s1t2u3",
        orderType: "Sell",
        price: "3.53",
        gpuCount: "45",
        startDate: "Thu Aug 01 2024 07:00:00 GMT-0700 (Pacific Daylight Time)",
        time: "8/1/2024, 7:00:00 AM",
        total: "158.85",
        endTime: "Aug 10, 2024 @7:00 AM"
    },
    {
        refNumber: "v4w5x6",
        orderType: "Buy",
        price: "2.33",
        gpuCount: "30",
        startDate: "Sat May 25 2024 12:00:00 GMT-0700 (Pacific Daylight Time)",
        time: "5/25/2024, 12:00:00 PM",
        total: "69.9",
        endTime: "Jun 4, 2024 @12:00 PM"
    },
    {
        refNumber: "y7z8a1",
        orderType: "Buy",
        price: "2.70",
        gpuCount: "100",
        startDate: "Mon Apr 15 2024 13:00:00 GMT-0700 (Pacific Daylight Time)",
        time: "4/15/2024, 1:00:00 PM",
        total: "270",
        endTime: "May 5, 2024 @1:00 PM"
    },
    {
        refNumber: "a1b2c3",
        orderType: "Buy",
        price: "2.50",
        gpuCount: "150",
        startDate: "Tue May 14 2024 10:00:00 GMT-0700 (Pacific Daylight Time)",
        time: "5/14/2024, 10:00:00 AM",
        total: "375",
        endTime: "May 14, 2024 @6:00 PM"
    },
    {
        refNumber: "d4e5f6",
        orderType: "Sell",
        price: "3.45",
        gpuCount: "200",
        startDate: "Wed Jun 19 2024 08:00:00 GMT-0700 (Pacific Daylight Time)",
        time: "6/19/2024, 8:00:00 AM",
        total: "690",
        endTime: "Jun 19, 2024 @3:00 PM"
    },
    {
        refNumber: "g7h8i9",
        orderType: "Sell",
        price: "3.15",
        gpuCount: "50",
        startDate: "Fri Jul 05 2024 09:00:00 GMT-0700 (Pacific Daylight Time)",
        time: "7/5/2024, 9:00:00 AM",
        total: "157.5",
        endTime: "Jul 05, 2024 @2:00 PM"
    },
    {
        refNumber: "marketPriceRow",
        orderType: " ",
        price: "2.85",
        gpuCount: "0",
        startDate: " ",
        time: " ",
        total: "0",
        endTime: " "
    },
];

function formatDateRange(start: string, end: string): string {
    const formatDate = (date: string): string => {
        const options: Intl.DateTimeFormatOptions = { month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleString('en-US', options);
    };

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
export const processedMockData = processMockData(mockData)
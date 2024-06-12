import Image from "next/image";
import OrderBookComponent from "@/components/OrderBook";
import RecentTransactions from "@/components/RecentTransactions";
import PlaceOrderForm from "@/components/PlaceOrderForm";
import { NextUIProvider } from "@nextui-org/react";
import OrderBook from "@/components/OrderBook";


export default function Home() {
  return (
    <NextUIProvider>
      <main className="flex flex-col p-24 text-stone-950">
        <PlaceOrderForm />
        <OrderBook />

        {/* <div className="min-h-screen bg-gray-100 p-4"> */}
        {/* <h1 className="text-2xl font-bold mb-4 font-color">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Order Book</h2>
            <OrderBookComponent />
            <div className="h-32 bg-gray-200 rounded-md"></div>
          </div> */}
        {/* <div className="bg-white shadow-md rounded-lg p-4"> */}
        {/* <h2 className="text-xl font-semibold mb-2">Place Bid/Ask</h2> */}
        {/* <div className="h-32 bg-gray-200 rounded-md"></div> */}
        {/* </div> */}
        {/* <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
            <RecentTransactions />
            <div className="h-32 bg-gray-200 rounded-md"></div>
          </div> */}
        {/* </div> */}
        {/* </div> */}
      </main >
    </NextUIProvider>
  );
}

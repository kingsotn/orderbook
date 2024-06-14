import PlaceOrderForm from "@/components/PlaceOrderForm";
import { NextUIProvider } from "@nextui-org/react";
import OrderBook from "@/components/OrderBook";


export default function Home() {
  return (
    <NextUIProvider>
      <main className="flex p-24 justify-evenly text-stone-950 mx-auto max-w-7xl">
        <div className="flex mx-4">
          <PlaceOrderForm />
        </div>
        <div className="flex mx-4">
          <OrderBook />
        </div>
      </main >
    </NextUIProvider>
  );
}

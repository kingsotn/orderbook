// src/server/websocket.ts
import { WebSocketServer } from 'ws';
import { OrderBook } from '../app';

let orderBook: OrderBook = { bids: [], asks: [] };

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    ws.send(JSON.stringify(orderBook));
});

export const updateOrderBook = (updatedOrderBook: OrderBook) => {
    orderBook = updatedOrderBook;
    wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(orderBook));
        }
    });
};

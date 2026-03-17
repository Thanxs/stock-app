import 'dotenv/config';
import WebSocket, { WebSocketServer } from 'ws';
import axios from 'axios';

import type { Stock } from './models/interfaces/stock.interface';
import { StockSymbols } from './models/enums/stock-symbols.enum';

const API_KEY = process.env.FINNHUB_KEY;
const PORT = Number(process.env.PORT) || 3000;

if (!API_KEY) {
  throw new Error('Finnhub API key is missing');
}

const symbols = [StockSymbols.AAPL, StockSymbols.GOOGL, StockSymbols.MSFT, StockSymbols.TSLA];

const wss = new WebSocketServer({ port: PORT });
console.log(`WebSocket server running on ws://localhost:${PORT}`);

async function fetchStock(symbol: string): Promise<Stock | null> {
  try {
    const res = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`,
    );

    return {
      symbol,
      name: symbol,
      price: res.data.c,
      high: res.data.h,
      low: res.data.l,
      // Quote API does not provide 52-week high/low — using ±20% of previous close as approximation
      week52High: res.data.pc * 1.2,
      week52Low: res.data.pc * 0.8,
    };
  } catch (err: any) {
    console.error('Error fetching stock', symbol, err.message);
    return null;
  }
}

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');

  const interval = setInterval(async () => {
    for (const symbol of symbols) {
      const stock = await fetchStock(symbol);
      if (stock && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(stock));
      }
    }
  }, 4000);

  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});

# Stock App

A real-time stock quotes application with an **Angular** frontend and a **Node.js WebSocket** backend. The server fetches live data from the [Finnhub](https://finnhub.io/) API and streams it to connected clients.

## Prerequisites

- **Node.js** (v18 or later recommended)
- **npm** (v10 or later)

## Quick start

### 1. Install dependencies

From the project root:

```bash
npm install
cd server && npm install && cd ..
```

### 2. Configure the API key

The backend uses the [Finnhub](https://finnhub.io/) API for stock quotes. Create a `.env` file in the `server` folder:

```bash
cd server
```

Create `server/.env` with:

```
FINNHUB_KEY=your_api_key_here
PORT=3000
```

**Getting an API key:** Sign up at [finnhub.io](https://finnhub.io/) and copy your free API key from the dashboard.

### 3. Run the project

From the **project root**:

```bash
npm run dev
```

This starts both the Angular dev server and the WebSocket backend in a single terminal. Open [http://localhost:4200](http://localhost:4200) in your browser. The app connects to the WebSocket server at `ws://localhost:3000`.

---

## Run commands

| Command           | Description                                      |
|-------------------|--------------------------------------------------|
| `npm run dev`     | Start **frontend + backend** (recommended)        |
| `npm start`       | Start **frontend only** (Angular on :4200)       |
| `npm run server`  | Start **backend only** (WebSocket on :3000)      |
| `npm run build`   | Build the Angular app for production             |

---

## API key and rate limits

The app uses **Finnhub’s free tier**, which has a **limited number of requests per minute** (e.g. 60 calls/min). If you see `429 Too Many Requests` or missing data:

1. **Use your own API key**  
   Replace the placeholder in `server/.env` with a key from your [Finnhub](https://finnhub.io/) account. Shared or demo keys hit the limit quickly.

2. **Respect the limit**  
   The server is tuned to stay under the free-tier limit (one batch of requests every few seconds). Opening many tabs or increasing the update frequency can trigger rate limiting.

3. **Upgrade if needed**  
   For higher traffic or more symbols, consider Finnhub’s paid plans, which offer higher rate limits.

Never commit your real API key or `.env` file to version control. The repo should only contain `.env.example` (if present) with placeholder values.

---

## Project structure

```
stock-app/
├── src/                    # Angular app (frontend)
│   └── app/
│       ├── features/       # Stock list & cards
│       ├── services/       # WebSocket, loader, stock
│       └── shared/         # Loader component
├── server/                 # Node.js WebSocket server
│   ├── server.ts
│   └── .env                # Your FINNHUB_KEY (create this)
├── package.json            # Frontend deps + dev script
└── README.md
```

---

## Development

### Frontend

- **Angular 21** with standalone components, signals, and control flow.
- Run: `npm start` → [http://localhost:4200](http://localhost:4200).

### Backend

- **Node.js** + **ws** + **axios**; TypeScript via `ts-node`.
- Run: `npm run server` from the project root (or `npm run dev` from `server/`).
- Reads `FINNHUB_KEY` and `PORT` from `server/.env`.

### Code scaffolding (Angular)

```bash
ng generate component component-name
ng generate --help
```

### Tests

```bash
ng test
```

---

## Further reading

- [Angular CLI](https://angular.dev/tools/cli)
- [Finnhub API](https://finnhub.io/docs/api)

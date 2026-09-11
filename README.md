# 🧭 TravelX — Full-Stack Intelligent Travel Discovery Engine

> **"Your next adventure is closer than you think."**  
> An intelligent, location-aware travel discovery engine designed for travelers in unfamiliar locations to seamlessly explore attractions, hidden stepwells, cult local eateries, budget stays, and customized itineraries.

---

## 🌟 Core Product Features

1. **"Explore Me" One-Click Geolocation**:
   - Requests browser permission and captures latitude & longitude.
   - Automatically detects the nearest city/district and resolves distances to landmarks.
   - Comprehensive fallback for location denial or timeouts.
2. **Immersive Vertical Place-Wise Scrolling Experience**:
   - Sequential, high-impact storytelling layout (`Place 01` $\rightarrow$ `Place 02` $\rightarrow$ `Place 03`).
   - High-definition photography with smooth scaling on hover.
   - Distance indicators, crowd level radar, golden hour photography tips, and entry fee metrics.
   - Direct Google Maps navigation with single-tap directions.
3. **Interactive Maps**:
   - Visual map showing live user radar pulse, attraction markers, food spots, and stays.
4. **Nearby Stays & Authentic Culinary Spots**:
   - Dedicated sections for backpacker hostels, heritage havelis, street food stalls, and rooftop cafes.
5. **Full User Authentication**:
   - Secure registration, login, and JWT Bearer token sessions backed by bcrypt password hashing.
   - Sync wishlist / saved places and custom multi-day trip itineraries.
6. **Smart Travel Budget Estimator**:
   - Calculates custom stay, food, transport, and entry fee breakdowns.
   - Generates side-by-side tier comparisons for *Backpacker*, *Comfort*, and *Luxury*.
7. **Modular AI Recommendation Architecture**:
   - Intelligent scoring engine evaluating interests, budget, available hours, and distance to suggest custom routes.

---

## 🏗️ Architecture & Tech Stack

```text
TravelX/
├── frontend/ (Root Next.js Application)
│   ├── src/
│   │   ├── app/                 # Next.js App Router (/explore, /places, /saved, etc.)
│   │   ├── components/          # Reusable UI, cards, layout, map, and explore stream
│   │   ├── context/             # AuthContext, LocationContext, SavedContext
│   │   ├── services/            # REST API client (api.ts)
│   │   ├── types/               # TypeScript interfaces (Place, Stay, Trip, User)
│   │   └── data/                # Curated fallback catalog & seed data
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
├── backend/ (Node.js Express + TypeScript REST API)
│   ├── src/
│   │   ├── config/              # MongoDB connection with dynamic in-memory fallback
│   │   ├── controllers/         # Explore, auth, places, stays, food, trips, budget
│   │   ├── middleware/          # JWT auth middleware & centralized error handler
│   │   ├── models/              # Mongoose schemas: User, Place, Favorite, Trip
│   │   ├── routes/              # Express API routers
│   │   ├── services/            # Normalized places, stays, food, and AI recommendation engines
│   │   ├── utils/               # Haversine distance calculator & geo lookup
│   │   └── server.ts            # Main entry point on port 5000
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

### Technology Highlights
* **Frontend**: Next.js 16 (Turbopack, React 19), TypeScript, Tailwind CSS v4, Lucide React.
* **Backend**: Node.js, Express 4, TypeScript, CORS, JSON Web Tokens (JWT), bcryptjs.
* **Database**: MongoDB + Mongoose with automatic memory-backed fallback for instant development without database setup.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18.x or newer)
- npm (v9.x or newer)
- MongoDB (optional; the backend automatically runs in memory-backed mode if no URI is supplied)

### 1. Start the Backend REST API Server

```bash
cd backend
npm install
npm run build
npm start
```

* Backend will start on **`http://localhost:5000`**
* Health check: `http://localhost:5000/health`

### 2. Start the Frontend Next.js Web App

Open a new terminal in the project root:

```bash
npm install
npm run dev
```

* Frontend will open on **`http://localhost:3000`**

---

## 📡 REST API Documentation

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/health` | Server health and status check | No |
| `GET` | `/api/explore?lat=...&lng=...&radius=...` | Discovers nearby places sorted by proximity | No |
| `GET` | `/api/places` | List normalized attractions with category filters | No |
| `GET` | `/api/places/:id` | Get comprehensive details of a single landmark | No |
| `GET` | `/api/stays?lat=...&lng=...` | Nearby hotels, hostels, and heritage havelis | No |
| `GET` | `/api/restaurants?lat=...&lng=...` | Nearby eateries, street food, and cafes | No |
| `POST` | `/api/auth/register` | Create user account (`name`, `email`, `password`) | No |
| `POST` | `/api/auth/login` | Sign in with email & password, returns JWT token | No |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | **Yes (Bearer)** |
| `GET` | `/api/favorites` | Retrieve user's bookmarked places | **Yes (Bearer)** |
| `POST` | `/api/favorites` | Bookmark a place | **Yes (Bearer)** |
| `DELETE`| `/api/favorites/:placeId` | Remove bookmark | **Yes (Bearer)** |
| `GET` | `/api/trips` | Get user's saved multi-day itineraries | **Yes (Bearer)** |
| `POST` | `/api/trips` | Save custom trip itinerary | **Yes (Bearer)** |
| `POST` | `/api/budget/calculate` | Estimate total travel budget with tier comparisons | No |
| `GET` | `/api/search?q=...` | Unified search across places, stays, food & cities | No |
| `POST` | `/api/recommendations` | AI recommendation based on interests, time, budget | No |

---

## 🔐 Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/travelx # Optional; runs in memory mode if empty
JWT_SECRET=travelx_super_secret_jwt_key_2026
```

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🧪 Testing & Verification

Run frontend verification:
```bash
npm run build
```

Run backend verification:
```bash
cd backend
npx tsc --noEmit
npm run build
```

---

## 📄 License
MIT License. Built for modern explorers and wanderers.

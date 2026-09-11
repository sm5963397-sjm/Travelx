import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { errorHandler } from "./middleware/errorMiddleware";

// Route imports
import authRoutes from "./routes/authRoutes";
import exploreRoutes from "./routes/exploreRoutes";
import placesRoutes from "./routes/placesRoutes";
import staysRoutes from "./routes/staysRoutes";
import restaurantsRoutes from "./routes/restaurantsRoutes";
import favoritesRoutes from "./routes/favoritesRoutes";
import tripsRoutes from "./routes/tripsRoutes";
import budgetRoutes from "./routes/budgetRoutes";
import searchRoutes from "./routes/searchRoutes";
import recommendationsRoutes from "./routes/recommendationsRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// CORS Configuration
app.use(
  cors({
    origin: [FRONTEND_URL, "http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger (Development)
app.use((req, res, next) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  }
  next();
});

// Health check endpoints
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "healthy",
    service: "TravelX Backend REST API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "healthy",
    service: "TravelX Backend REST API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// Mount API routes
app.use("/api/auth", authRoutes);
app.use("/api/explore", exploreRoutes);
app.use("/api/places", placesRoutes);
app.use("/api/stays", staysRoutes);
app.use("/api/restaurants", restaurantsRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/trips", tripsRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/recommendations", recommendationsRoutes);

// Centralized error handler
app.use(errorHandler);

import { PlacesService } from "./services/placesService";

// Start server
async function startServer() {
  await connectDB();
  await PlacesService.seedInitialPlaces();

  app.listen(PORT, () => {
    console.log("==========================================");
    console.log(`🚀 TravelX REST API Server is running on port ${PORT}`);
    console.log(`📍 Health Check: http://localhost:${PORT}/health`);
    console.log(`🧭 Explore API: http://localhost:${PORT}/api/explore`);
    console.log(`🔐 Auth API:    http://localhost:${PORT}/api/auth`);
    console.log(`🏨 Stays API:   http://localhost:${PORT}/api/stays`);
    console.log(`🍛 Food API:    http://localhost:${PORT}/api/restaurants`);
    console.log(`✈️  Trips API:   http://localhost:${PORT}/api/trips`);
    console.log(`💰 Budget API:  http://localhost:${PORT}/api/budget`);
    console.log("==========================================");
  });
}

startServer();

export default app;

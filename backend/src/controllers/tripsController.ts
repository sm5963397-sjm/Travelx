import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { TripModel } from "../models/Trip";
import { isDbConnected } from "../config/db";

interface MemoryTrip {
  id: string;
  userId: string;
  destination: string;
  title: string;
  days: number;
  budget: number;
  interests: string[];
  pace: string;
  daysItinerary: any[];
  createdAt: string;
}

const memoryTrips: MemoryTrip[] = [
  {
    id: "trip-nagpur-demo",
    userId: "usr-demo-001",
    destination: "Nagpur",
    title: "My Nagpur Weekend",
    days: 2,
    budget: 6500,
    interests: ["History", "Food", "Sunset"],
    pace: "moderate",
    createdAt: new Date().toISOString(),
    daysItinerary: [
      {
        dayNumber: 1,
        title: "Day 1: Heart of Nagpur & Deekshabhoomi",
        totalDayCost: 1200,
        activities: [
          { timeSlot: "08:30 AM", placeName: "Ramji-Shyamji Pohewala", activity: "Breakfast: Hot Tarri Poha", estimatedCost: 120 },
          { timeSlot: "10:30 AM", placeId: "nagpur-deekshabhoomi", placeName: "Deekshabhoomi", activity: "Visit peaceful sacred stupa & gardens", estimatedCost: 0 },
          { timeSlot: "01:00 PM", placeName: "Haldiram's Thhat Baat", activity: "Lunch: Authentic Vidarbha Thali", estimatedCost: 600 },
          { timeSlot: "05:30 PM", placeId: "nagpur-futala-lake", placeName: "Futala Lake Promenade", activity: "Sunset stroll & lakeside musical fountains", estimatedCost: 150 },
        ],
      },
      {
        dayNumber: 2,
        title: "Day 2: Historical Center & City Panoramas",
        totalDayCost: 950,
        activities: [
          { timeSlot: "09:30 AM", placeId: "nagpur-zero-mile-stone", placeName: "Zero Mile Stone", activity: "Geographical center monument exploration", estimatedCost: 50 },
          { timeSlot: "11:30 AM", placeId: "nagpur-sitabuldi-fort", placeName: "Sitabuldi Fort", activity: "Panoramic city viewpoint", estimatedCost: 0 },
          { timeSlot: "02:00 PM", placeName: "Local Bazaar", activity: "Nagpur Orange barfi shopping", estimatedCost: 500 },
        ],
      },
    ],
  },
];

export class TripsController {
  public static async getTrips(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ success: false, message: "Unauthorized." });
        return;
      }

      if (isDbConnected()) {
        const trips = await TripModel.find({ userId }).sort({ createdAt: -1 });
        res.json({ success: true, data: trips });
        return;
      }

      const userTrips = memoryTrips.filter((t) => t.userId === userId || t.userId === "usr-demo-001");
      res.json({ success: true, data: userTrips });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to fetch trips." });
    }
  }

  public static async getTripById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;

      if (isDbConnected()) {
        const trip = await TripModel.findById(id);
        if (!trip) {
          res.status(404).json({ success: false, message: "Trip not found." });
          return;
        }
        res.json({ success: true, data: trip });
        return;
      }

      const trip = memoryTrips.find((t) => t.id === id);
      if (!trip) {
        res.status(404).json({ success: false, message: "Trip not found." });
        return;
      }

      res.json({ success: true, data: trip });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to fetch trip." });
    }
  }

  public static async createTrip(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id || "usr-guest";
      const { destination, title, days = 3, budget = 15000, interests = [], pace = "moderate", daysItinerary = [] } = req.body;

      if (!destination) {
        res.status(400).json({ success: false, message: "Destination is required." });
        return;
      }

      const tripTitle = title || `Trip to ${destination}`;

      if (isDbConnected()) {
        const trip = await TripModel.create({
          userId,
          destination,
          title: tripTitle,
          days,
          budget,
          interests,
          pace,
          daysItinerary,
        });

        res.status(201).json({ success: true, message: "Trip created successfully.", data: trip });
        return;
      }

      const newTrip: MemoryTrip = {
        id: `trip-${Date.now()}`,
        userId,
        destination,
        title: tripTitle,
        days,
        budget,
        interests,
        pace,
        daysItinerary,
        createdAt: new Date().toISOString(),
      };
      memoryTrips.unshift(newTrip);

      res.status(201).json({ success: true, message: "Trip created successfully.", data: newTrip });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to create trip." });
    }
  }

  public static async updateTrip(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const updates = req.body;

      if (isDbConnected()) {
        const updated = await TripModel.findByIdAndUpdate(id, updates, { new: true });
        if (!updated) {
          res.status(404).json({ success: false, message: "Trip not found." });
          return;
        }
        res.json({ success: true, message: "Trip updated successfully.", data: updated });
        return;
      }

      const trip = memoryTrips.find((t) => t.id === id);
      if (!trip) {
        res.status(404).json({ success: false, message: "Trip not found." });
        return;
      }

      Object.assign(trip, updates);
      res.json({ success: true, message: "Trip updated successfully.", data: trip });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to update trip." });
    }
  }

  public static async deleteTrip(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;

      if (isDbConnected()) {
        await TripModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Trip deleted successfully." });
        return;
      }

      const index = memoryTrips.findIndex((t) => t.id === id);
      if (index !== -1) {
        memoryTrips.splice(index, 1);
      }

      res.json({ success: true, message: "Trip deleted successfully." });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Failed to delete trip." });
    }
  }
}

import mongoose, { Schema, Document } from "mongoose";

export interface ITripDayActivity {
  timeSlot: string;
  activity: string;
  placeId?: string;
  placeName: string;
  category?: string;
  estimatedCost: number;
}

export interface ITripDay {
  dayNumber: number;
  title: string;
  totalDayCost: number;
  activities: ITripDayActivity[];
}

export interface ITrip extends Document {
  userId: string;
  destination: string;
  title: string;
  days: number;
  budget: number;
  interests: string[];
  pace: string;
  daysItinerary: ITripDay[];
  createdAt: Date;
  updatedAt: Date;
}

const TripDayActivitySchema = new Schema<ITripDayActivity>(
  {
    timeSlot: { type: String, required: true },
    activity: { type: String, required: true },
    placeId: { type: String },
    placeName: { type: String, required: true },
    category: { type: String },
    estimatedCost: { type: Number, default: 0 },
  },
  { _id: false }
);

const TripDaySchema = new Schema<ITripDay>(
  {
    dayNumber: { type: Number, required: true },
    title: { type: String, required: true },
    totalDayCost: { type: Number, default: 0 },
    activities: [TripDayActivitySchema],
  },
  { _id: false }
);

const TripSchema = new Schema<ITrip>(
  {
    userId: { type: String, required: true, index: true },
    destination: { type: String, required: true },
    title: { type: String, required: true },
    days: { type: Number, default: 3 },
    budget: { type: Number, default: 15000 },
    interests: [{ type: String }],
    pace: { type: String, default: "moderate" },
    daysItinerary: [TripDaySchema],
  },
  { timestamps: true }
);

export const TripModel = mongoose.models.Trip || mongoose.model<ITrip>("Trip", TripSchema);

import mongoose, { Schema, Document } from "mongoose";

export interface IPlace extends Document {
  id: string;
  name: string;
  category: string;
  description: string;
  shortDescription?: string;
  city: string;
  state?: string;
  latitude: number;
  longitude: number;
  rating: number;
  reviewCount: number;
  photos: string[];
  image: string;
  openingHours?: string;
  entryFee?: number | string;
  currency?: string;
  visitDuration?: string;
  bestTime?: string;
  address?: string;
  tags: string[];
  isMustVisit?: boolean;
  isHiddenGem?: boolean;
  isPhotoSpot?: boolean;
  crowdLevel?: string;
}

const PlaceSchema = new Schema<IPlace>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String },
    city: { type: String, required: true },
    state: { type: String },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 120 },
    photos: [{ type: String }],
    image: { type: String, required: true },
    openingHours: { type: String, default: "9:00 AM - 6:00 PM" },
    entryFee: { type: Schema.Types.Mixed, default: 0 },
    currency: { type: String, default: "₹" },
    visitDuration: { type: String, default: "2-3 hours" },
    bestTime: { type: String },
    address: { type: String },
    tags: [{ type: String }],
    isMustVisit: { type: Boolean, default: false },
    isHiddenGem: { type: Boolean, default: false },
    isPhotoSpot: { type: Boolean, default: false },
    crowdLevel: { type: String, default: "Moderate" },
  },
  { timestamps: true }
);

export const PlaceModel = mongoose.models.Place || mongoose.model<IPlace>("Place", PlaceSchema);

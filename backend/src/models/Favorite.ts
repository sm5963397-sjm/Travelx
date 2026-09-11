import mongoose, { Schema, Document } from "mongoose";

export interface IFavorite extends Document {
  userId: string;
  placeId: string;
  placeName: string;
  category?: string;
  image?: string;
  createdAt: Date;
}

const FavoriteSchema = new Schema<IFavorite>(
  {
    userId: { type: String, required: true, index: true },
    placeId: { type: String, required: true },
    placeName: { type: String, required: true },
    category: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

FavoriteSchema.index({ userId: 1, placeId: 1 }, { unique: true });

export const FavoriteModel =
  mongoose.models.Favorite || mongoose.model<IFavorite>("Favorite", FavoriteSchema);

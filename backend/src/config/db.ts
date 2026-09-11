import mongoose from "mongoose";

let isConnected = false;
let isInMemoryFallback = false;

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.trim() === "") {
    console.log("ℹ️  No MONGODB_URI provided. Running in memory-backed dynamic storage mode.");
    isInMemoryFallback = true;
    return;
  }

  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 4000,
    });
    isConnected = true;
    console.log("✅ MongoDB successfully connected.");
  } catch (error: any) {
    console.warn("⚠️  MongoDB connection failed (" + error.message + "). Falling back to memory storage.");
    isInMemoryFallback = true;
  }
}

export function isDbConnected(): boolean {
  return isConnected;
}

export function isUsingFallback(): boolean {
  return isInMemoryFallback;
}

import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose

if(!cached) {
  cached = (global as any).mongoose = { 
    conn: null, promise: null 
  }
}

export const connectToDatabase = async () => {
  console.log("Attempting to connect to the database...");
  
  
  if (cached.conn) {
    console.log("Using existing database connection.");
    return cached.conn;
  }

  if (!MONGODB_URL) {
    console.error("Missing MONGODB_URL");
    throw new Error('Missing MONGODB_URL');
  }

  console.log("Creating a new database connection...");
  cached.promise = 
    cached.promise || 
    mongoose.connect(MONGODB_URL, { 
      dbName: 'imaginify', bufferCommands: false 
    })

  try {
    cached.conn = await cached.promise;
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }

  return cached.conn;
}

import mongoose from 'mongoose';

interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: GlobalMongoose;
}

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

async function connectDB(): Promise<typeof mongoose> {
  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    const opts = {
      bufferCommands: false,
    };

    global.mongoose.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    const conn = await global.mongoose.promise;
    global.mongoose.conn = conn;
    return conn;
  } catch (e) {
    global.mongoose.promise = null;
    throw e;
  }
}

export default connectDB;

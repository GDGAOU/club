import { MongoClient } from 'mongodb';

if (!process.env.DATABASE_URL) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const uri = process.env.DATABASE_URL;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    mongo: {
      conn: Promise<MongoClient> | null;
      promise: Promise<MongoClient> | null;
    };
  };

  if (!globalWithMongo.mongo.conn) {
    client = new MongoClient(uri, options);
    globalWithMongo.mongo.conn = client.connect();
  }
  clientPromise = globalWithMongo.mongo.conn;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

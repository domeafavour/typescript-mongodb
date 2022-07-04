import { MongoClient } from 'mongodb';
import { config } from './config';

export const client = new MongoClient(config.mongoClientUrl);

async function connectMongoDb() {
  try {
    await client.connect();
  } catch (error) {
    await client.close();
  }
}

export default connectMongoDb;

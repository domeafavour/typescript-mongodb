import { CollectionOptions, Document, MongoClient } from 'mongodb';
import { config } from './config';

export const client = new MongoClient(config.mongoClientUrl);

export function getCollection<TSchema extends Document>(
  name: string,
  options?: CollectionOptions
) {
  return client.db('test').collection<TSchema>(name, options);
}

async function connectMongoDb() {
  try {
    await client.connect();
  } catch (error) {
    await client.close();
  }
}

export default connectMongoDb;

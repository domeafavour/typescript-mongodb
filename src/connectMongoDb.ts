import { CollectionOptions, Document, MongoClient } from 'mongodb';
import Mongoose from 'mongoose';
import { config } from './config';

export const client = new MongoClient(config.mongoClientUrl);

let mongoose: typeof Mongoose | null = null;

export function getCollection<TSchema extends Document>(
  name: string,
  options?: CollectionOptions
) {
  return mongoose!.connection
    .getClient()
    .db('test')
    .collection<TSchema>(name, options);
}

async function connectMongoDb() {
  try {
    mongoose = await Mongoose.connect(config.mongoClientUrl);
  } catch (error) {}
}

export default connectMongoDb;

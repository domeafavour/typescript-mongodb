import { CollectionOptions, Document } from 'mongodb';
import Mongoose from 'mongoose';
import { config } from './config';

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

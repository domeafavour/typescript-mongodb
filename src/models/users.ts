import { ObjectId } from 'mongodb';
import { client } from '../connectMongoDb';
import { IPagination, IUser } from '../typings';

const testDb = client.db('test');

export async function findUsersByPage(pagination: IPagination) {
  const { page = 1, size = 10 } = pagination;

  // db.users.users.find();
  const collection = testDb.collection<IUser>('users');
  const usersCursor = collection
    .find({})
    // .project<{ name: string }>({
    //   name: 1,
    // })
    .skip((page - 1) * size)
    .limit(size);

  const users = await usersCursor.toArray();
  const total = await collection.countDocuments();

  return { total, data: users };
}

export async function findUserById(id: string) {
  const collection = testDb.collection<IUser>('users');

  const user = await collection.findOne({
    _id: new ObjectId(id),
  });

  return user;
}

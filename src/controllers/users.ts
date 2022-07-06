import { ObjectId } from 'mongodb';
import { getCollection } from '../connectMongoDb';
import { IPagination, IUser, WithStringId } from '../typings';

export async function findUsersByPage(pagination: IPagination) {
  const { page = 1, size = 10 } = pagination;

  // db.users.users.find();
  const collection = getCollection<WithStringId<IUser>>('users');
  const usersCursor = collection
    .find({})
    .project<{ name: string }>({
      id: {
        $toString: '$_id',
      },
      name: 1,
      email: 1,
    })
    .skip((page - 1) * size)
    .limit(size);

  const users = await usersCursor.toArray();
  const total = await collection.countDocuments();

  return { total, data: users };
}

export async function findUserById(id: string) {
  const collection = getCollection<IUser>('users');

  const user = await collection.findOne({
    _id: new ObjectId(id),
  });

  return user;
}

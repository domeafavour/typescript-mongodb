import { ObjectId } from 'mongodb';
import { client } from '../connectMongoDb';
import { IPost, IUser } from '../typings';

const db = client.db('test');

export async function findAll() {
  const cursor = db.collection('posts').find({});
  const posts = await cursor.toArray();
  return posts;
}

export async function findPost(id: string) {
  const post = await db.collection('posts').findOne<IPost>({
    _id: new ObjectId(id),
  });

  const commentsCursor = db
    .collection('comments')
    .aggregate<IPost & { users: IUser[] }>([
      {
        $lookup: {
          localField: 'userId',
          from: 'users',
          foreignField: '_id',
          as: 'users',
        },
      },
      {
        $project: {
          title: 1,
          users: 1,
        },
      },
    ]);

  const comments = await commentsCursor.toArray();

  return {
    ...post,
    comments: comments.map((comment) => ({
      title: comment.title,
      user: comment.users[0],
    })),
  };
}

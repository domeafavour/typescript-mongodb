import { ObjectId } from 'mongodb';
import { getCollection } from '../connectMongoDb';
import { IPost, IUser } from '../typings';

export async function findAll() {
  const cursor = getCollection('posts').find({});
  const posts = await cursor.toArray();
  return posts;
}

export async function createPost(
  post: Omit<IPost, 'authorId'> & { author: string }
) {
  const insertedPost = await getCollection<IPost>('posts').insertOne({
    content: post.content,
    description: post.description,
    title: post.title,
    authorId: new ObjectId(post.author),
  });

  return insertedPost;
}

export async function findPost(id: string) {
  const postObjectId = new ObjectId(id);
  const post = await getCollection('posts').findOne<IPost>({
    _id: postObjectId,
  });

  const commentsCursor = getCollection('comments').aggregate<
    IPost & { users: IUser[] }
  >([
    { $match: { postId: postObjectId } },
    {
      $lookup: {
        localField: 'userId',
        from: 'users',
        foreignField: '_id',
        as: 'users',
      },
    },
    { $project: { title: 1, user: { $first: '$users' } } },
  ]);

  const comments = await commentsCursor.toArray();

  return {
    ...post,
    comments,
  };
}

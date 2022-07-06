import { ObjectId } from 'mongodb';
import { getCollection } from '../connectMongoDb';
import { IUser, WithStringId } from '../typings';

export async function findCommentsByPostId(postId: string) {
  const cursor = getCollection('comments').aggregate<
    WithStringId<{
      title: string;
      user: WithStringId<IUser>;
    }>
  >([
    {
      $match: {
        postId: new ObjectId(postId),
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'users',
      },
    },
    {
      $project: {
        title: 1,
        id: {
          $toString: '$_id',
        },
        _id: 0,
        user: {
          $first: [
            {
              $map: {
                input: '$users',
                as: 'user',
                in: {
                  name: '$$user.name',
                  email: '$$user.email',
                  id: {
                    $toString: '$$user._id',
                  },
                },
              },
            },
          ],
        },
      },
    },
  ]);

  const comments = await cursor.toArray();

  return comments;
}

type AddCommentEntity = {
  title: string;
  postId: string;
  userId: string;
};

export async function addComment(entity: AddCommentEntity) {
  return await getCollection('comments').insertOne({
    title: entity.title,
    postId: new ObjectId(entity.postId),
    userId: new ObjectId(entity.userId),
  });
}

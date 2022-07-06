import { ObjectId } from 'mongodb';
import { getCollection } from '../connectMongoDb';
import { IPost, IUser, WithStringId } from '../typings';
import { findCommentsByPostId } from './comments';

export async function findAll() {
  const cursor = getCollection('posts').find({});
  const posts = await cursor.toArray();
  return posts;
}

export async function createPost(
  post: Omit<IPost, 'authorId'> & { author: string }
) {
  const insertedPost = await getCollection<IPost & { createdTime: Date }>(
    'posts'
  ).insertOne({
    content: post.content,
    description: post.description,
    title: post.title,
    authorId: new ObjectId(post.author),
    createdTime: new Date(),
  });

  return insertedPost;
}

export async function deletePost(postId: string) {
  return await getCollection('posts').deleteOne({
    _id: new ObjectId(postId),
  });
}

export async function updatePost(
  post: Omit<IPost, 'authorId'> & { id: string; author: string }
) {
  const updatedPost = await getCollection<IPost>('posts').updateOne(
    {
      _id: new ObjectId(post.id),
    },
    {
      $set: {
        authorId: new ObjectId(post.author),
        title: post.title,
        content: post.content,
        description: post.description,
      },
    }
  );

  return updatedPost;
}

type PostType = WithStringId<
  Omit<IPost, 'authorId'> & {
    author: WithStringId<IUser>;
    comments: WithStringId<{ title: string; user: WithStringId<IUser> }>[];
  }
>;

export async function findPost(id: string): Promise<PostType | null> {
  const postObjectId = new ObjectId(id);
  const postsCursor = getCollection('posts').aggregate<
    WithStringId<Omit<IPost, 'authorId'> & { author: WithStringId<IUser> }>
  >([
    { $match: { _id: postObjectId } },
    {
      $lookup: {
        from: 'users',
        localField: 'authorId',
        foreignField: '_id',
        as: 'authors',
      },
    },
    {
      $project: {
        id: {
          $toString: '$_id',
        },
        _id: 0,
        title: 1,
        content: 1,
        description: 1,
        createdTime: {
          $dateToString: {
            date: '$createdTime',
            format: '%Y-%m-%d %H:%M:%S',
          },
        },
        author: {
          $first: [
            {
              $map: {
                input: '$authors',
                as: 'author',
                in: {
                  id: {
                    $toString: '$$author._id',
                  },
                  name: '$$author.name',
                  email: '$$author.email',
                },
              },
            },
          ],
        },
      },
    },
  ]);

  const matchesPosts = await postsCursor.toArray();

  if (!matchesPosts.length) {
    return null;
  }

  const comments = await findCommentsByPostId(id);

  return {
    ...matchesPosts[0],
    comments,
  };
}
